package singleuser

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basicsuccess"
)

type Response struct {
	basicsuccess.Response
	User model.User `json:"user"`
}

func New(user model.User, statusCode int) *Response {
	return &Response{
		Response: basicsuccess.Response{
			Success:        true,
			HttpStatusCode: statusCode,
		},
		User: user,
	}
}
