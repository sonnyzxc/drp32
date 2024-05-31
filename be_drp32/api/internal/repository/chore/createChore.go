package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func (i impl) CreateChore(ctx context.Context, chore model.Chore) error {
	return chore.Orm().Insert(ctx, i.dbConn, boil.Blacklist())
}
