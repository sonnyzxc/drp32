package chore

import (
	"context"
	"database/sql"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"
)

func (i impl) GetChoreByID(ctx context.Context, choreID int64) (model.Chore, error) {
	var chore model.Chore
	err := orm.Chores(orm.ChoreWhere.ChoreID.EQ(choreID)).Bind(ctx, i.dbConn, &chore)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return model.Chore{}, ErrChoreIDNotFound
		}
		return model.Chore{}, err
	}
	return chore, nil
}
