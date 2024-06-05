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

func (i impl) CreateChore(ctx context.Context, desc string, emoji string, points int, assignedTo int64, dueDate time.Time) error {
	if _, err := i.repo.User().GetUserByID(context.Background(), assignedTo); err != nil {
		log.Printf(controller.LogErrMessage("CreateChore", "user assigned to cannot be found", err))
		return err
	}

	return i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		return txRepo.Chore().CreateChore(ctx, model.Chore{
			Description:   desc,
			Emoji:         emoji,
			Points:        points,
			Completed:     false,
			AssignedTo:    assignedTo,
			DueDate:       dueDate,
			TimeCompleted: null.NewTime(time.Now(), false),
		})
	}, nil)
}
