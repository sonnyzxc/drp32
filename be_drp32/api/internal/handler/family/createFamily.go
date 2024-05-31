package family

import (
	"errors"
	"github.com/go-chi/render"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/request/familyName"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basic_success"
	"net/http"
)

func (h Handler) CreateFamily() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		var request familyName.Request
		if err := render.Bind(r, &request); err != nil {
			return errors.New("bad request"), http.StatusBadRequest
		}

		if err := h.ctrl.CreateFamily(r.Context(), request.FamilyName); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		handler.EnableCors(&w)
		if err := render.Render(w, r, basic_success.New(http.StatusCreated)); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		return nil, http.StatusCreated
	})
}
