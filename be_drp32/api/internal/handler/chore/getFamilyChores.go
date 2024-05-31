package chore

import (
	"github.com/go-chi/render"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/request/familyID"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/choresList"
	"net/http"
	"strconv"
)

func (h Handler) GetFamilyChores() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		var request familyID.Request
		var err error

		request.FamilyID, err = strconv.ParseInt(r.URL.Query().Get("familyID"), 10, 64)

		if err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		chores, err := h.ctrl.GetFamilyChores(r.Context(), request.FamilyID)
		if err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		handler.EnableCors(&w)
		if err = render.Render(w, r, choresList.New(chores, http.StatusOK)); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		return nil, http.StatusOK
	})
}
