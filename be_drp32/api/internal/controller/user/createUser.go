package user

import (
	"context"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/family"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/user"
	"log"
)

func (i impl) CreateUser(ctx context.Context, email string, name string, familyID int64) error {
	_, err := i.repo.User().GetUserByEmail(context.Background(), email)

	if err == nil {
		log.Printf(controller.LogErrMessage("CreateUser", "email already created", err))
		return ErrAlreadyCreated
	}

	if !errors.Is(err, user.ErrEmailNotFound) {
		log.Printf(controller.LogErrMessage("CreateUser", "unknown error", err))
		return err
	}

	_, err = i.repo.Family().GetFamilyByID(context.Background(), familyID)
	if errors.Is(err, family.ErrFamilyIDNotFound) {
		log.Printf(controller.LogErrMessage("CreateUser", "family not found", err))
		return ErrFamilyNotFound
	}

	if err != nil {
		log.Printf(controller.LogErrMessage("CreateUser", "unknown error", err))
		return err
	}

	return i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		return txRepo.User().CreateUser(ctx, model.User{
			UserEmail: email,
			UserName:  name,
			FamilyID:  familyID,
		})
	}, nil)
}
