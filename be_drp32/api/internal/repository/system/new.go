package system

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/db/pg"
)

// Repository provides the specification of the functionality provided by this pkg
type Repository interface {
	// CheckDB will check if calls to DB are successful or not
	CheckDB(context.Context) error
}

// New returns an implementation instance satisfying Repository
func New(dbConn pg.ContextExecutor) Repository {
	return impl{dbConn: dbConn}
}

type impl struct {
	dbConn pg.ContextExecutor
}
