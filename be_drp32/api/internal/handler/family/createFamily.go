package family

import (
	"errors"
	"github.com/go-chi/render"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/request/familyname"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/singlefamily"
	"net/http"
)

func (h Handler) CreateFamily() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		var request familyname.Request
		if err := render.Bind(r, &request); err != nil {
			return errors.New("bad request"), http.StatusBadRequest
		}

		var family model.Family
		var err error
		if family, err = h.ctrl.CreateFamily(r.Context(), request.FamilyName); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		if err := render.Render(w, r, singlefamily.New(family, http.StatusCreated)); err != nil {
			return errors.New("something went wrong"), http.StatusInternalServerError
		}

		return nil, http.StatusCreated
	})
}
