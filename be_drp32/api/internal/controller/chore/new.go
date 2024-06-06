package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
	"mime/multipart"
	"time"
)

type Controller interface {
	CreateChore(ctx context.Context, desc string, emoji string, points int, assignedTo int64, dueDate time.Time) (model.Chore, error)
	GetChores(ctx context.Context, familyID int64, completed int, assignedTo int64) (model.Chores, error)
	CompleteChore(ctx context.Context, choreID int64, file multipart.File, fileHandler *multipart.FileHeader, present bool) (model.Chore, error)
	DeleteChoreByID(ctx context.Context, choreID int64) error
}

type impl struct {
	repo repository.Registry
}

func New(repo repository.Registry) Controller {
	return impl{repo: repo}
}
