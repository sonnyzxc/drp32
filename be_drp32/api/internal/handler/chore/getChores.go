package chore

import (
	"bytes"
	"encoding/json"
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
		var assignedTo int64 = -1
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
			assignedTo, err = strconv.ParseInt(r.URL.Query().Get("assigned_to"), 10, 64)
			if err != nil {
				return errors.New("something went wrong"), http.StatusInternalServerError
			}
		}

		chores, err := h.ctrl.GetChores(r.Context(), familyID, completed, assignedTo)
		if err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		// custom encoding because we don't want escaped HTML for links
		resp := choresList.New(chores, http.StatusOK)
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

		return nil, http.StatusOK
	})
}

type contextKey struct {
	name string
}

func (k *contextKey) String() string {
	return "chi render context value " + k.name
}
