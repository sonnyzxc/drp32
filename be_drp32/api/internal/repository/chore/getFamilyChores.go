package chore

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

func (i impl) GetFamilyChores(ctx context.Context, familyID int64) (model.Chores, error) {
	query := fmt.Sprintf(
		"SELECT * FROM %s",
		orm.TableNames.Chores,
	)

	var chores model.Chores
	err := orm.NewQuery(qm.SQL(query)).Bind(ctx, i.dbConn, &chores)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	return chores, nil
}
