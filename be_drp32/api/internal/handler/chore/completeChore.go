package chore

import (
	"errors"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basic_success"
	"net/http"
	"strconv"
)

func (h Handler) CompleteChore() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		choreIDString := chi.URLParam(r, "choreID")
		if choreIDString == "" {
			return errors.New("bad request"), http.StatusBadRequest
		}

		choreID, err := strconv.ParseInt(choreIDString, 10, 64)
		if err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		f, fh, err := r.FormFile("file")

		present := false
		if err != nil {
			if !(errors.Is(err, http.ErrMissingFile) || errors.Is(err, http.ErrNotMultipart)) {
				return err, http.StatusInternalServerError
			}
		} else {
			present = true
			defer f.Close()
		}

		if err = h.ctrl.CompleteChore(r.Context(), choreID, f, fh, present); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		if err = render.Render(w, r, basic_success.New(http.StatusCreated)); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		return nil, http.StatusCreated
	})
}
