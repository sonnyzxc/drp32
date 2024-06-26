package chore

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/realtimeupdates"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basicsuccess"
	"net/http"
	"strconv"
)

func (h Handler) DeleteChoreByID() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		choreIDString := chi.URLParam(r, "choreID")
		if choreIDString == "" {
			return errors.New("bad request"), http.StatusBadRequest
		}

		choreID, err := strconv.ParseInt(choreIDString, 10, 64)
		if err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		if err = h.ctrl.DeleteChoreByID(r.Context(), choreID); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		if err = render.Render(w, r, basicsuccess.New(http.StatusOK)); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		realtimeupdates.Broadcast <- []byte("update")

		return nil, http.StatusOK
	})
}
