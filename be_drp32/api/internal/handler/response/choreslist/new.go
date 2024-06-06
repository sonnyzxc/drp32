package choreslist

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basicsuccess"
)

type Response struct {
	basicsuccess.Response
	Chores model.Chores `json:"chores"`
}

func New(list model.Chores, statusCode int) *Response {
	return &Response{
		Response: basicsuccess.Response{
			Success:        true,
			HttpStatusCode: statusCode,
		},
		Chores: list,
	}
}
