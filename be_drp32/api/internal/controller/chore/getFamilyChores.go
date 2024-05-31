package chore

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"log"
)

func (i impl) GetFamilyChores(ctx context.Context, familyID int64) (model.Chores, error) {
	chores, err := i.repo.Chore().GetFamilyChores(context.Background(), familyID)

	if err != nil {
		log.Printf(controller.LogErrMessage("GetFamilyChores", "unknown error", err))
		return nil, err
	}

	return chores, nil
}
