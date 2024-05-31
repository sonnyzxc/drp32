package health

import (
	"context"
	"github.com/pkg/errors"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler"
	"net/http"
)

// CheckReadiness checks for system readiness
func (h Handler) CheckReadiness() http.HandlerFunc {
	return handler.ErrorHandler(func(w http.ResponseWriter, r *http.Request) (error, int) {
		err := h.systemCtrl.CheckReadiness(r.Context())

		if errors.Is(err, context.Canceled) {
			return nil, http.StatusOK
		}

		return err, http.StatusInternalServerError
	})
}
