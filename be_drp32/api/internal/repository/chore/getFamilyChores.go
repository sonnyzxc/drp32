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
		"SELECT * FROM %s "+
			"WHERE %s IN ( "+
			"SELECT %s FROM %s "+
			"WHERE %s=%d "+
			") AND %s=FALSE",
		orm.TableNames.Chores,
		orm.ChoreTableColumns.AssignedTo,
		orm.UserTableColumns.UserID,
		orm.TableNames.Users,
		orm.UserTableColumns.FamilyID,
		familyID,
		orm.ChoreTableColumns.Completed,
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
