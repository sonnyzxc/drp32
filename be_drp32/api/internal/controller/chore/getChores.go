package chore

import (
	"context"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/request"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/env"
	"github.com/volatiletech/null/v8"
	"log"
	"time"
)

func (i impl) GetChores(ctx context.Context, familyID int64, completed int, assignedTo int64) (model.Chores, error) {

	var allChores model.Chores
	var chores model.Chores
	var err error

	if familyID == -1 {
		allChores, err = i.repo.Chore().GetChores(context.Background())
	} else {
		allChores, err = i.repo.Chore().GetFamilyChores(context.Background(), familyID)
	}

	if err != nil {
		log.Printf(controller.LogErrMessage("GetChores", "unknown error", err))
		return nil, err
	}

	var sess *session.Session
	var svc *s3.S3
	if env.GetAndValidateF("APP_VERSION") == "release" {
		sess, err = session.NewSession(&aws.Config{Region: aws.String("eu-west-2")})
		if err != nil {
			log.Printf(controller.LogErrMessage("GetChore", "creating an AWS session", err))
			return nil, err
		}

		_, err = sess.Config.Credentials.Get()
		if err != nil {
			log.Printf(controller.LogErrMessage("GetChore", "getting AWS credentials", err))
			return nil, err
		}

		svc = s3.New(sess)
	}

	for _, v := range allChores {
		completedBool := false
		if completed == 1 {
			completedBool = true
		}

		if (assignedTo == -1 || assignedTo == v.AssignedTo) && (completed == -1 || completedBool == v.Completed) {
			if env.GetAndValidateF("APP_VERSION") == "release" && v.ImgDir.Valid && v.ImgDir.String != "" {
				var req *request.Request
				req, _ = svc.GetObjectRequest(&s3.GetObjectInput{
					Bucket: aws.String("drp32"),
					Key:    aws.String(v.ImgDir.String),
				})
				urlStr, err := req.Presign(15 * time.Minute)
				if err != nil {
					log.Printf(controller.LogErrMessage("GetChore", "creating an AWS session", err))
					return nil, err
				}
				v.ImgDir = null.StringFrom(urlStr)
			}

			chores = append(chores, v)
		}
	}

	return chores, nil
}
