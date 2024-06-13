package chore

import (
	"bytes"
	"encoding/json"
	"errors"
	"github.com/go-chi/chi/v5"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/singlechore"
	"net/http"
	"strconv"
)

func (h Handler) CompleteChore() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		choreIDString := chi.URLParam(r, "choreID")
		if choreIDString == "" {
			return errors.New("bad request"), http.StatusBadRequest
		}

		userIDString := chi.URLParam(r, "userID")
		if userIDString == "" {
			return errors.New("bad request"), http.StatusBadRequest
		}

		choreID, err := strconv.ParseInt(choreIDString, 10, 64)
		if err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		userID, err := strconv.ParseInt(userIDString, 10, 64)
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

		var chore model.Chore
		if chore, err = h.ctrl.CompleteChore(r.Context(), choreID, userID, f, fh, present); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		// custom encoding because we don't want escaped HTML for links
		resp := singlechore.New(chore, http.StatusCreated)
		buf := &bytes.Buffer{}
		enc := json.NewEncoder(buf)
		enc.SetEscapeHTML(false)
		if err := enc.Encode(resp); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		if status, ok := r.Context().Value(&contextKey{"Status"}).(int); ok {
			w.WriteHeader(status)
		}
		w.Write(buf.Bytes())

		return nil, http.StatusCreated
	})
}
