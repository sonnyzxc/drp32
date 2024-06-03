package choreDetails

import (
	"github.com/pkg/errors"
	"net/http"
)

func (req *Request) Bind(r *http.Request) error {
	if req.Description == "" || req.Emoji == "" {
		return errors.New("missing fields")
	}
	return nil
}
