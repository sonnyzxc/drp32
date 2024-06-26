package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/db/pg"
)

type Repository interface {
	CreateChore(ctx context.Context, chore model.Chore) (model.Chore, error)
	GetFamilyChores(ctx context.Context, familyID int64) (model.Chores, error)
	UpdateChore(ctx context.Context, chore model.Chore) (model.Chore, error)
	GetChoreByID(ctx context.Context, choreID int64) (model.Chore, error)
	GetChores(ctx context.Context) (model.Chores, error)
	DeleteChoreByID(ctx context.Context, choreID int64) error
}

type impl struct {
	dbConn pg.ContextExecutor
}

func New(dbConn pg.ContextExecutor) Repository {
	return impl{dbConn: dbConn}
}
