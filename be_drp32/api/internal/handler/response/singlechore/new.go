package singlechore

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basicsuccess"
)

type Response struct {
	basicsuccess.Response
	Chore model.Chore `json:"chore"`
}

func New(chore model.Chore, statusCode int) *Response {
	return &Response{
		Response: basicsuccess.Response{
			Success:        true,
			HttpStatusCode: statusCode,
		},
		Chore: chore,
	}
}
