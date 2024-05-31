package family

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
)

// CreateFamily TODO add tests, handle specific errors with logging
func (i impl) CreateFamily(ctx context.Context, familyName string) error {
	return i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		return txRepo.Family().CreateFamily(ctx, familyName)
	}, nil)
}
