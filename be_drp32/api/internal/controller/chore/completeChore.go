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

func (i impl) CompleteChore(ctx context.Context, choreID int64, userID int64, file multipart.File, fileHandler *multipart.FileHeader, present bool) (model.Chore, error) {
	chore, err := i.repo.Chore().GetChoreByID(context.Background(), choreID)

	if errors.Is(err, choreRepo.ErrChoreIDNotFound) {
		log.Printf(controller.LogErrMessage("CompleteChore", "chore not found", err))
		return model.Chore{}, ErrChoreNotFound
	}

	if err != nil {
		log.Printf(controller.LogErrMessage("CompleteChore", "i dunno", err))
		return model.Chore{}, err
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
				return model.Chore{}, err
			}

			_, err = sess.Config.Credentials.Get()
			if err != nil {
				log.Printf(controller.LogErrMessage("CompleteChore", "getting AWS credentials", err))
				return model.Chore{}, err
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
				return model.Chore{}, err
			}

			// Retrieve URL
			req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
				Bucket: aws.String("drp32"),
				Key:    aws.String(fileName),
			})

			url, err = req.Presign(15 * time.Minute)
			if err != nil {
				log.Printf(controller.LogErrMessage("CompleteChore", "obtaining a presigned URL", err))
				return model.Chore{}, err
			}
		}
		chore.ImgDir = null.StringFrom(fileName)
	}

	var updatedChore model.Chore
	err = i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		var err error
		updatedChore, err = txRepo.Chore().UpdateChore(ctx, chore)
		return err
	}, nil)

	updatedChore.ImgDir = null.StringFrom(url)
	return updatedChore, err
}
