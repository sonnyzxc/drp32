package userdetails

import (
	"github.com/pkg/errors"
	"net/http"
)

// Bind TODO add tests
func (req *Request) Bind(r *http.Request) error {
	if req.Email == "" || req.Name == "" {
		return errors.New("missing fields")
	}
	return nil
}
