package chore

import (
	"context"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
	choreRepo "github.com/sonnyzxc/drp/be_drp32/api/internal/repository/chore"
	"github.com/volatiletech/null/v8"
	"log"
	"time"
)

func (i impl) IncompleteChore(ctx context.Context, choreID int64) (model.Chore, error) {
	chore, err := i.repo.Chore().GetChoreByID(context.Background(), choreID)

	if errors.Is(err, choreRepo.ErrChoreIDNotFound) {
		log.Printf(controller.LogErrMessage("CompleteChore", "chore not found", err))
		return model.Chore{}, ErrChoreNotFound
	}

	if err != nil {
		log.Printf(controller.LogErrMessage("CompleteChore", "i dunno", err))
		return model.Chore{}, err
	}

	chore.Completed = false
	chore.AssignedTo = null.NewInt64(0, false)
	chore.TimeCompleted = null.NewTime(time.Now(), false)

	var updatedChore model.Chore
	err = i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		var err error
		updatedChore, err = txRepo.Chore().UpdateChore(ctx, chore)
		return err
	}, nil)

	if err != nil {
		return model.Chore{}, err
	}

	return updatedChore, nil
}
