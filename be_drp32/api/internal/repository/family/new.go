package family

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/db/pg"
)

type Repository interface {
	CreateFamily(ctx context.Context, familyName string) error
	GetFamilyByID(ctx context.Context, familyID int64) (model.Family, error)
}

type impl struct {
	dbConn pg.ContextExecutor
}

func New(dbConn pg.ContextExecutor) Repository {
	return impl{dbConn: dbConn}
}
