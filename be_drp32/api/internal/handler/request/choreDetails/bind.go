package choreDetails

import (
	"github.com/pkg/errors"
	"net/http"
)

func (req *Request) Bind(r *http.Request) error {
	if req.Description == "" {
		return errors.New("chore needs a description")
	}
	return nil
}
