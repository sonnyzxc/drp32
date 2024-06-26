package router

import (
	"context"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/chore"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/family"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/health"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/realtimeupdates"
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
	rtuHandler           realtimeupdates.Handler
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
		middleware.RequestID,
		middleware.RealIP,
	)

	r.Get("/_/ready", rtr.healthRESTHandler.CheckReadiness())
	//r.Post("/create/family", rtr.familyRESTHandler.CreateFamily())
	//r.Post("/create/user", rtr.userRESTHandler.CreateUser())
	//r.Post("/create/chore", rtr.choreRESTHandler.CreateChore())
	//r.Get("/get/chores", rtr.choreRESTHandler.GetChores())
	//r.Put("/completeChore/{choreID}", rtr.choreRESTHandler.CompleteChore())

	r.Route("/family", func(r chi.Router) {
		r.Post("/", rtr.familyRESTHandler.CreateFamily())
	})

	r.Route("/chore", func(r chi.Router) {
		r.Post("/", rtr.choreRESTHandler.CreateChore())
		r.Delete("/{choreID}", rtr.choreRESTHandler.DeleteChoreByID())
		r.Put("/complete/{choreID}/{userID}", rtr.choreRESTHandler.CompleteChore())
		r.Put("/incomplete/{choreID}", rtr.choreRESTHandler.IncompleteChore())
	})

	r.Route("/chores", func(r chi.Router) {
		r.Get("/", rtr.choreRESTHandler.GetChores())
	})

	r.Route("/user", func(r chi.Router) {
		r.Post("/", rtr.userRESTHandler.CreateUser())
	})

	r.Get("/rtu", rtr.rtuHandler.HandleConnections())

	return r
}
