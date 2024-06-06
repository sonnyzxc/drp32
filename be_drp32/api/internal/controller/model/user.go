package model

import "github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"

type User struct {
	UserID    int64  `boil:"user_id" json:"user_id" toml:"user_id" yaml:"user_id"`
	UserEmail string `boil:"user_email" json:"user_email" toml:"user_email" yaml:"user_email"`
	UserName  string `boil:"user_name" json:"user_name" toml:"user_name" yaml:"user_name"`
	FamilyID  int64  `boil:"family_id" json:"family_id" toml:"family_id" yaml:"family_id"`
	Admin     bool   `boil:"admin" json:"admin" toml:"admin" yaml:"admin"`
}

type Users []User

func (u User) Orm() *orm.User {
	return &orm.User{
		UserID:    u.UserID,
		UserEmail: u.UserEmail,
		UserName:  u.UserName,
		FamilyID:  u.FamilyID,
		Admin:     u.Admin,
	}
}

func UserModel(u *orm.User) User {
	return User{
		UserID:    u.UserID,
		UserEmail: u.UserEmail,
		UserName:  u.UserName,
		FamilyID:  u.FamilyID,
		Admin:     u.Admin,
	}
}
