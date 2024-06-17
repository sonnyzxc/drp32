package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
	"github.com/volatiletech/null/v8"
	"log"
	"time"
)

func (i impl) CreateChore(ctx context.Context, desc string, emoji string, points int, assignedTo null.Int64, dueDate null.Time, recurring int) (model.Chore, error) {
	if assignedTo.Valid {
		if _, err := i.repo.User().GetUserByID(context.Background(), assignedTo.Int64); err != nil {
			log.Printf(controller.LogErrMessage("CreateChore", "user assigned to cannot be found", err))
			return model.Chore{}, err
		}
	}

	var chore model.Chore
	err := i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		var err error
		chore, err = txRepo.Chore().CreateChore(ctx, model.Chore{
			Description:   desc,
			Emoji:         emoji,
			Points:        points,
			Completed:     false,
			AssignedTo:    assignedTo,
			DueDate:       dueDate,
			TimeCompleted: null.NewTime(time.Now(), false),
			Recurring:     recurring,
			Next:          null.NewInt64(0, false),
		})
		return err
	}, nil)

	return chore, err
}
