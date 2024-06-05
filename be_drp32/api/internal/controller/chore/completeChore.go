package chore

import (
	"context"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
	choreRepo "github.com/sonnyzxc/drp/be_drp32/api/internal/repository/chore"
	"github.com/volatiletech/null/v8"
	"log"
	"time"
)

func (i impl) CompleteChore(ctx context.Context, choreID int64, imgDir string) error {
	chore, err := i.repo.Chore().GetChoreByID(context.Background(), choreID)

	if errors.Is(err, choreRepo.ErrChoreIDNotFound) {
		log.Printf(controller.LogErrMessage("CompleteChore", "chore not found", err))
		return ErrChoreNotFound
	}

	if err != nil {
		log.Printf(controller.LogErrMessage("CompleteChore", "i dunno", err))
		return err
	}

	if chore.Completed == true {
		return nil
	}

	chore.Completed = true
	chore.TimeCompleted = null.TimeFrom(time.Now())
	chore.ImgDir = null.StringFrom(imgDir)
	return i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		return txRepo.Chore().UpdateChore(ctx, chore)
	}, nil)
}
