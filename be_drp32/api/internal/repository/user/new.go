package user

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/db/pg"
)

type Repository interface {
	CreateUser(ctx context.Context, user model.User) error
	GetUserByEmail(ctx context.Context, email string) (model.User, error)
	GetUserByID(ctx context.Context, id int64) (model.User, error)
}

type impl struct {
	dbConn pg.ContextExecutor
}

func New(dbConn pg.ContextExecutor) Repository {
	return impl{dbConn: dbConn}
}
