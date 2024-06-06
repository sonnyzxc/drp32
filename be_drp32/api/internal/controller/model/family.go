package model

import "github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"

type Family struct {
	FamilyID   int64  `boil:"family_id" json:"family_id" toml:"family_id" yaml:"family_id"`
	FamilyName string `boil:"family_name" json:"family_name" toml:"family_name" yaml:"family_name"`
}

type Families []Family

func (f Family) Orm() *orm.Family {
	return &orm.Family{
		FamilyID:   f.FamilyID,
		FamilyName: f.FamilyName,
	}
}

func FamilyModel(f *orm.Family) Family {
	return Family{
		FamilyID:   f.FamilyID,
		FamilyName: f.FamilyName,
	}
}
