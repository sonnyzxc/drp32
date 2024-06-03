package user

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
)

type Controller interface {
	CreateUser(ctx context.Context, email string, name string, familyID int64, admin bool) error
}

type impl struct {
	repo repository.Registry
}

func New(repo repository.Registry) Controller {
	return impl{repo: repo}
}
