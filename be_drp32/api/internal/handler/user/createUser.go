package user

import (
	"errors"
	"github.com/go-chi/render"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/request/userdetails"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/singleuser"
	"net/http"
)

func (h Handler) CreateUser() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		var request userdetails.Request
		if err := render.Bind(r, &request); err != nil {
			return errors.New("bad request"), http.StatusBadRequest
		}

		var user model.User
		var err error
		if user, err = h.ctrl.CreateUser(r.Context(), request.Email, request.Name, request.FamilyID, request.Admin); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		if err := render.Render(w, r, singleuser.New(user, http.StatusCreated)); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		return nil, http.StatusCreated
	})
}
