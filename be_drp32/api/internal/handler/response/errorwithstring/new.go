package errorwithstring

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/basicsuccess"
)

type Response struct {
	basicsuccess.Response
	ErrMessage string `json:"error_message"`
}

func New(message string, statusCode int) *Response {
	return &Response{
		Response: basicsuccess.Response{
			Success:        false,
			HttpStatusCode: statusCode,
		},
		ErrMessage: message,
	}
}
