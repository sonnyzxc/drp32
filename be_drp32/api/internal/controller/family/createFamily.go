package family

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
)

// CreateFamily TODO add tests, handle specific errors with logging
func (i impl) CreateFamily(ctx context.Context, familyName string) (model.Family, error) {
	var family model.Family
	err := i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		var err error
		family, err = txRepo.Family().CreateFamily(ctx, familyName)
		return err
	}, nil)
	return family, err
}
