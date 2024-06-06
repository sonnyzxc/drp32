package familyname

import (
	"github.com/pkg/errors"
	"net/http"
)

// Bind TODO add tests
func (req *Request) Bind(r *http.Request) error {
	if req.FamilyName == "" {
		return errors.New("family name is a required field")
	}
	return nil
}
