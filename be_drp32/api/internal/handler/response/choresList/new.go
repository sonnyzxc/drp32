package choresList

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basic_success"
)

type Response struct {
	basic_success.Response
	Chores model.Chores `json:"chores"`
}

func New(list model.Chores, statusCode int) *Response {
	return &Response{
		Response: basic_success.Response{
			Success:        true,
			HttpStatusCode: statusCode,
		},
		Chores: list,
	}
}
