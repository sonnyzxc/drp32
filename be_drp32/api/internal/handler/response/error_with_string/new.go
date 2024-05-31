package error_with_string

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basic_success"
)

type Response struct {
	basic_success.Response
	ErrMessage string `json:"error_message"`
}

func New(message string, statusCode int) *Response {
	return &Response{
		Response: basic_success.Response{
			Success:        false,
			HttpStatusCode: statusCode,
		},
		ErrMessage: message,
	}
}
