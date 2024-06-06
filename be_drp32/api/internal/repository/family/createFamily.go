package family

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

// CreateFamily TODO add tests
func (i impl) CreateFamily(ctx context.Context, familyName string) (model.Family, error) {
	newFamily := &orm.Family{
		FamilyName: familyName,
	}

	insertColumns := boil.Blacklist(orm.FamilyColumns.FamilyID)

	err := newFamily.Insert(ctx, i.dbConn, insertColumns)
	if err != nil {
		return model.Family{}, err
	}

	return model.FamilyModel(newFamily), err
}
