package choredetails

import (
	"github.com/pkg/errors"
	"net/http"
)

func (req *Request) Bind(r *http.Request) error {
	if req.Description == "" {
		return errors.New("missing fields")
	}
	return nil
}
