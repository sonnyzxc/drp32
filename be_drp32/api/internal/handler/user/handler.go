package user

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/user"
)

// Handler is the handler for this pkg
type Handler struct {
	ctrl user.Controller
}

// New instantiates a new Handler and returns it
func New(ctrl user.Controller) Handler {
	return Handler{ctrl: ctrl}
}
