package user

import (
	"context"
	"database/sql"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"
)

func (i impl) GetUserByID(ctx context.Context, id int64) (model.User, error) {
	var user model.User
	err := orm.Users(orm.UserWhere.UserID.EQ(id)).Bind(ctx, i.dbConn, &user)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return model.User{}, ErrUserIDNotFound
		}
		return model.User{}, err
	}
	return user, nil
}
