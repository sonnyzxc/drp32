package family

import (
	"errors"
	"github.com/go-chi/render"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/request/familyname"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basicsuccess"
	"net/http"
)

func (h Handler) CreateFamily() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		var request familyname.Request
		if err := render.Bind(r, &request); err != nil {
			return errors.New("bad request"), http.StatusBadRequest
		}

		if err := h.ctrl.CreateFamily(r.Context(), request.FamilyName); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		if err := render.Render(w, r, basicsuccess.New(http.StatusCreated)); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		return nil, http.StatusCreated
	})
}
