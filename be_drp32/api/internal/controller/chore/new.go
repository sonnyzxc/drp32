package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
	"time"
)

type Controller interface {
	CreateChore(ctx context.Context, desc string, emoji string, points int, assignedTo int64, dueDate time.Time) error
	GetChores(ctx context.Context, familyID int64, completed int, assigned_to int64) (model.Chores, error)
	CompleteChore(ctx context.Context, choreID int64) error
}

type impl struct {
	repo repository.Registry
}

func New(repo repository.Registry) Controller {
	return impl{repo: repo}
}
