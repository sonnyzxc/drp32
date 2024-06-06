package chore

import (
	"errors"
	"github.com/go-chi/render"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/request/choredetails"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/singlechore"
	"net/http"
	"time"
)

func (h Handler) CreateChore() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		var request choredetails.Request
		if err := render.Bind(r, &request); err != nil {
			return errors.New("bad request"), http.StatusBadRequest
		}

		dueDate, err := time.Parse("2006-01-02", request.DueDate)

		//if err != nil || dueDate.Before(time.Now()) {
		//	return errors.New("bad request"), http.StatusBadRequest
		//}

		var chore model.Chore
		if chore, err = h.ctrl.CreateChore(r.Context(), request.Description, request.Emoji, request.Points, request.AssignedTo, dueDate); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		if err = render.Render(w, r, singlechore.New(chore, http.StatusCreated)); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		return nil, http.StatusCreated
	})
}
