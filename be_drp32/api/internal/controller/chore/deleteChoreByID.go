package chore

import (
	"context"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/chore"
	"log"
)

func (i impl) DeleteChoreByID(ctx context.Context, choreID int64) error {
	_, err := i.repo.Chore().GetChoreByID(context.Background(), choreID)

	if errors.Is(err, chore.ErrChoreIDNotFound) {
		return nil
	}

	if err != nil {
		log.Printf(controller.LogErrMessage("DeleteChoreByID", "unknown error", err))
		return err
	}

	return i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		return txRepo.Chore().DeleteChoreByID(ctx, choreID)
	}, nil)
}
