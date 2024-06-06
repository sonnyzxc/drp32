package family

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
)

type Controller interface {
	CreateFamily(ctx context.Context, familyName string) (model.Family, error)
}

type impl struct {
	repo repository.Registry
}

func New(repo repository.Registry) Controller {
	return impl{repo: repo}
}
