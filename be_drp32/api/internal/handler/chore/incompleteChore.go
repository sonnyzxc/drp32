package chore

import (
	"bytes"
	"encoding/json"
	"errors"
	"github.com/go-chi/chi/v5"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/realtimeupdates"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/singlechore"
	"net/http"
	"strconv"
)

func (h Handler) IncompleteChore() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		choreIDString := chi.URLParam(r, "choreID")
		if choreIDString == "" {
			return errors.New("bad request"), http.StatusBadRequest
		}

		choreID, err := strconv.ParseInt(choreIDString, 10, 64)
		if err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		var chore model.Chore
		if chore, err = h.ctrl.IncompleteChore(r.Context(), choreID); err != nil {
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

		realtimeupdates.Broadcast <- []byte("update")

		return nil, http.StatusCreated
	})
}
