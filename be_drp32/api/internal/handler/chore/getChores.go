package chore

import (
	"github.com/go-chi/render"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/choresList"
	"net/http"
	"strconv"
)

func (h Handler) GetChores() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		completed := -1
		var familyID int64 = -1
		var assigned_to int64 = -1
		var err error

		if r.URL.Query().Has("completed") {
			completed = 0
			completedBool, err := strconv.ParseBool(r.URL.Query().Get("completed"))
			if err != nil {
				return errors.New("something went wrong"), http.StatusInternalServerError
			}

			if completedBool {
				completed = 1
			}
		}

		if r.URL.Query().Has("familyID") {
			familyID, err = strconv.ParseInt(r.URL.Query().Get("familyID"), 10, 64)
			if err != nil {
				return errors.New("something went wrong"), http.StatusInternalServerError
			}
		}

		if r.URL.Query().Has("assigned_to") {
			assigned_to, err = strconv.ParseInt(r.URL.Query().Get("assigned_to"), 10, 64)
			if err != nil {
				return errors.New("something went wrong"), http.StatusInternalServerError
			}
		}

		chores, err := h.ctrl.GetChores(r.Context(), familyID, completed, assigned_to)
		if err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		if err = render.Render(w, r, choresList.New(chores, http.StatusOK)); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		return nil, http.StatusOK
	})
}
