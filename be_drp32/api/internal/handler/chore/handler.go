package chore

import "github.com/sonnyzxc/drp/be_drp32/api/internal/controller/chore"

type Handler struct {
	ctrl chore.Controller
}

// New instantiates a new Handler and returns it
func New(ctrl chore.Controller) Handler {
	return Handler{ctrl: ctrl}
}
