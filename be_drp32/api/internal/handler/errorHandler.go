package handler

import (
	"github.com/go-chi/render"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/response/errorwithstring"
	"net/http"
)

func ErrorHandler(f func(w http.ResponseWriter, r *http.Request) (error, int)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		err, status := f(w, r)

		if err != nil {
			render.Render(w, r, errorwithstring.New(err.Error(), status))
			return
		}
	}
}
