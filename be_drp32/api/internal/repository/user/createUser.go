package user

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func (i impl) CreateUser(ctx context.Context, user model.User) error {
	return user.Orm().Insert(ctx, i.dbConn, boil.Blacklist())
}
