package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
)

func (i impl) DeleteChoreByID(ctx context.Context, choreID int64) error {
	var chore model.Chore
	chore.ChoreID = choreID
	_, err := chore.Orm().Delete(ctx, i.dbConn)
	return err
}
