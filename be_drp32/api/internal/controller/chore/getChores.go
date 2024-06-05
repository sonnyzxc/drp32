package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"log"
)

func (i impl) GetChores(ctx context.Context, familyID int64, completed int, assignedTo int64) (model.Chores, error) {

	var allChores model.Chores
	var chores model.Chores
	var err error

	if familyID == -1 {
		allChores, err = i.repo.Chore().GetChores(context.Background())
	} else {
		allChores, err = i.repo.Chore().GetFamilyChores(context.Background(), familyID)
	}

	if err != nil {
		log.Printf(controller.LogErrMessage("GetChores", "unknown error", err))
		return nil, err
	}

	for _, v := range allChores {
		completedBool := false
		if completed == 1 {
			completedBool = true
		}

		if (assignedTo == -1 || assignedTo == v.AssignedTo) && (completed == -1 || completedBool == v.Completed) {
			chores = append(chores, v)
		}
	}

	return chores, nil
}
