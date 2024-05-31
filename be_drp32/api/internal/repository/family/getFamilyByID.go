package family

import (
	"context"
	"database/sql"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"
)

func (i impl) GetFamilyByID(ctx context.Context, familyID int64) (model.Family, error) {
	var family model.Family
	err := orm.Families(orm.FamilyWhere.FamilyID.EQ(familyID)).Bind(ctx, i.dbConn, &family)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return model.Family{}, ErrFamilyIDNotFound
		}
		return model.Family{}, err
	}
	return family, nil
}
