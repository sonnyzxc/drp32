package user

import (
	"context"
	"database/sql"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"
)

func (i impl) GetUserByEmail(ctx context.Context, email string) (model.User, error) {
	var user model.User
	err := orm.Users(orm.UserWhere.UserEmail.EQ(email)).Bind(ctx, i.dbConn, &user)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return model.User{}, ErrEmailNotFound
		}
		return model.User{}, err
	}
	return user, nil
}

