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

func (i impl) CreateUser(ctx context.Context, email string, name string, familyID int64, admin bool) (model.User, error) {
	_, err := i.repo.User().GetUserByEmail(context.Background(), email)

	if err == nil {
		log.Printf(controller.LogErrMessage("CreateUser", "email already created", err))
		return model.User{}, ErrAlreadyCreated
	}

	if !errors.Is(err, user.ErrEmailNotFound) {
		log.Printf(controller.LogErrMessage("CreateUser", "unknown error", err))
		return model.User{}, err
	}

	_, err = i.repo.Family().GetFamilyByID(context.Background(), familyID)
	if errors.Is(err, family.ErrFamilyIDNotFound) {
		log.Printf(controller.LogErrMessage("CreateUser", "family not found", err))
		return model.User{}, ErrFamilyNotFound
	}

	if err != nil {
		log.Printf(controller.LogErrMessage("CreateUser", "unknown error", err))
		return model.User{}, err
	}

	var user model.User
	err = i.repo.DoInTx(context.Background(), func(ctx context.Context, txRepo repository.Registry) error {
		var err error
		user, err = txRepo.User().CreateUser(ctx, model.User{
			UserEmail: email,
			UserName:  name,
			FamilyID:  familyID,
			Admin:     admin,
		})

		return err
	}, nil)

	return user, err
}
