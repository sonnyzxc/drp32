package family

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/family"
)

// Handler is the handler for this pkg
type Handler struct {
	ctrl family.Controller
}

// New instantiates a new Handler and returns it
func New(ctrl family.Controller) Handler {
	return Handler{ctrl: ctrl}
}
