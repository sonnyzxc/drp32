package router

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/chore"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/family"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/system"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/controller/user"
	choreHandler "github.com/sonnyzxc/drp/be_drp32/api/internal/handler/chore"
	familyHandler "github.com/sonnyzxc/drp/be_drp32/api/internal/handler/family"
	healthHandler "github.com/sonnyzxc/drp/be_drp32/api/internal/handler/health"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/realtimeupdates"
	userHandler "github.com/sonnyzxc/drp/be_drp32/api/internal/handler/user"
)

// New creates and returns a new Router instance
func New(
	ctx context.Context,
	corsOrigin []string,
	isGQLIntrospectionOn bool,
	systemCtrl system.Controller,
	familyCtrl family.Controller,
	userCtrl user.Controller,
	choreCtrl chore.Controller,
) Router {
	return Router{
		ctx:                  ctx,
		corsOrigins:          corsOrigin,
		isGQLIntrospectionOn: isGQLIntrospectionOn,
		healthRESTHandler:    healthHandler.New(systemCtrl),
		familyRESTHandler:    familyHandler.New(familyCtrl),
		userRESTHandler:      userHandler.New(userCtrl),
		choreRESTHandler:     choreHandler.New(choreCtrl),
		rtuHandler:           realtimeupdates.New(),
	}
}
