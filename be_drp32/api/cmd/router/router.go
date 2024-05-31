package router

import (
	"context"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/chore"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/family"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/health"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/user"
	"net/http"
)

// Router defines the routes & handlers of the app
type Router struct {
	ctx                  context.Context
	corsOrigins          []string
	isGQLIntrospectionOn bool
	healthRESTHandler    health.Handler
	familyRESTHandler    family.Handler
	userRESTHandler      user.Handler
	choreRESTHandler     chore.Handler
}

// Handler returns the Handler for use by the server
func (rtr Router) Handler() http.Handler {
	r := chi.NewRouter()
	r.Use(
		render.SetContentType(render.ContentTypeJSON), // set content-type headers as application/json
		middleware.Logger, // log relationship request calls
		// middleware.DefaultCompress, // compress results, mostly gzipping assets and json
		middleware.StripSlashes, // match paths with a trailing slash, strip it, and continue routing through the mux
		middleware.Recoverer,    // recover from panics without crashing server
	)

	r.Get("/_/ready", rtr.healthRESTHandler.CheckReadiness())
	r.Post("/create/family", rtr.familyRESTHandler.CreateFamily())
	r.Post("/create/user", rtr.userRESTHandler.CreateUser())
	r.Post("/create/chore", rtr.choreRESTHandler.CreateChore())

	return r
}
