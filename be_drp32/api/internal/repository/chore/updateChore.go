package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func (i impl) UpdateChore(ctx context.Context, chore model.Chore) error {
	_, err := chore.Orm().Update(ctx, i.dbConn, boil.Blacklist())
	return err
}
