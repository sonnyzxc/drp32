package user

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func (i impl) CreateUser(ctx context.Context, user model.User) (model.User, error) {
	userOrm := user.Orm()
	err := userOrm.Insert(ctx, i.dbConn, boil.Blacklist())
	return model.UserModel(userOrm), err
}
