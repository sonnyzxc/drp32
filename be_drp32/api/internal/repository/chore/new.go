package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/db/pg"
)

type Repository interface {
	CreateChore(ctx context.Context, chore model.Chore) error
	GetFamilyChores(ctx context.Context, familyID int64) (model.Chores, error)
}

type impl struct {
	dbConn pg.ContextExecutor
}

func New(dbConn pg.ContextExecutor) Repository {
	return impl{dbConn: dbConn}
}
