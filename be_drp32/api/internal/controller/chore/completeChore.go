package chore

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
	choreRepo "github.com/sonnyzxc/drp/be_drp32/api/internal/repository/chore"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/env"
	"github.com/volatiletech/null/v8"
	"log"
	"mime/multipart"
	"path"
	"time"
)

func (i impl) CompleteChore(ctx context.Context, choreID int64, userID int64, file multipart.File, fileHandler *multipart.FileHeader, present bool) (model.Chores, error) {
	chore, err := i.repo.Chore().GetChoreByID(context.Background(), choreID)

	if errors.Is(err, choreRepo.ErrChoreIDNotFound) {
		log.Printf(controller.LogErrMessage("CompleteChore", "chore not found", err))
		return nil, ErrChoreNotFound
	}

	if err != nil {
		log.Printf(controller.LogErrMessage("CompleteChore", "i dunno", err))
		return nil, err
	}

	chore.Completed = true
	chore.AssignedTo = null.Int64From(userID)
	chore.TimeCompleted = null.TimeFrom(time.Now())
	var url string
	if !present {
		chore.ImgDir = null.StringFrom("")
		url = ""
	} else {
		fileName := fmt.Sprintf("uploads/%d%s", choreID, path.Ext(fileHandler.Filename))
		if env.GetAndValidateF("APP_VERSION") == "release" {
			// Set up AWS session
			sess, err := session.NewSession(&aws.Config{Region: aws.String("eu-west-2")})
			if err != nil {
				log.Printf(controller.LogErrMessage("CompleteChore", "creating an AWS session", err))
				return nil, err
			}

			_, err = sess.Config.Credentials.Get()
			if err != nil {
				log.Printf(controller.LogErrMessage("CompleteChore", "getting AWS credentials", err))
				return nil, err
			}

			svc := s3.New(sess)
			// Upload to bucket
			_, err = svc.PutObject(&s3.PutObjectInput{
				Bucket: aws.String("drp32"),
				Key:    aws.String(fileName),
				Body:   file,
				ACL:    aws.String("private"),
			})

			if err != nil {
				log.Printf(controller.LogErrMessage("CompleteChore", "uploading object to S3", err))
				return nil, err
			}

			// Retrieve URL
			req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
				Bucket: aws.String("drp32"),
				Key:    aws.String(fileName),
			})

			url, err = req.Presign(15 * time.Minute)
			if err != nil {
				log.Printf(controller.LogErrMessage("CompleteChore", "obtaining a presigned URL", err))
				return nil, err
			}
		}
		chore.ImgDir = null.StringFrom(fileName)
	}

	recurringChore := model.Chore{ChoreID: -1}
	if chore.Recurring != 0 && chore.DueDate.Valid {
		if !chore.Next.Valid {
			err = i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
				var err error
				recurringChore, err = txRepo.Chore().CreateChore(ctx, model.Chore{
					Description:   chore.Description,
					Emoji:         chore.Emoji,
					Points:        chore.Points,
					Completed:     false,
					AssignedTo:    null.NewInt64(0, false),
					DueDate:       null.TimeFrom(chore.DueDate.Time.Add(time.Hour * time.Duration(chore.Recurring*24))),
					TimeCompleted: null.NewTime(time.Now(), false),
					ImgDir:        null.NewString("", false),
					Recurring:     chore.Recurring,
					Next:          null.NewInt64(0, false),
				})
				return err
			}, nil)
		} else {
			recurringChore, err = i.repo.Chore().GetChoreByID(context.Background(), chore.Next.Int64)
		}
		if err != nil {
			return nil, err
		}
		chore.Next = null.Int64From(recurringChore.ChoreID)
	}

	var updatedChore model.Chore
	err = i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		var err error
		updatedChore, err = txRepo.Chore().UpdateChore(ctx, chore)
		return err
	}, nil)

	if err != nil {
		return nil, err
	}

	updatedChore.ImgDir = null.StringFrom(url)

	if recurringChore.ChoreID == -1 {
		return model.Chores{updatedChore}, nil
	}

	return model.Chores{updatedChore, recurringChore}, nil
}
