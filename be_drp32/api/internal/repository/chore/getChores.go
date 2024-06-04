package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"
)

func (i impl) GetChores(ctx context.Context) (model.Chores, error) {
	var chores model.Chores
	err := orm.Chores().Bind(ctx, i.dbConn, &chores)
	if err != nil {
		return nil, err
	}
	return chores, nil
}
