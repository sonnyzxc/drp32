package singlefamily

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basicsuccess"
)

type Response struct {
	basicsuccess.Response
	Family model.Family `json:"family"`
}

func New(family model.Family, statusCode int) *Response {
	return &Response{
		Response: basicsuccess.Response{
			Success:        true,
			HttpStatusCode: statusCode,
		},
		Family: family,
	}
}
