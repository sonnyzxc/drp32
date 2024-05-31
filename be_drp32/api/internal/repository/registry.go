package repository

import (
	"context"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/chore"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/family"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/system"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/user"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/db/pg"
	"time"

	"github.com/cenkalti/backoff/v4"
	pkgerrors "github.com/pkg/errors"
)

// Registry is the registry of all the domain specific repositories and also provides transaction capabilities.
type Registry interface {
	// System returns the system repo
	System() system.Repository
	// Family returns the family repo
	Family() family.Repository
	// User returns the user repo
	User() user.Repository
	// Chore returns the chore repo
	Chore() chore.Repository
	// DoInTx wraps operations within a db tx
	DoInTx(ctx context.Context, txFunc func(ctx context.Context, txRepo Registry) error, overrideBackoffPolicy backoff.BackOff) error
}

type impl struct {
	dbConn pg.BeginnerExecutor // Only used to start DB txns
	tx     pg.ContextExecutor  // Only used to keep track if txn has already been started to prevent devs from accidentally creating nested txns
	system system.Repository
	family family.Repository
	user   user.Repository
	chore  chore.Repository
}

// New returns a new instance of Registry
func New(dbConn pg.BeginnerExecutor) Registry {
	return impl{
		dbConn: dbConn,
		system: system.New(dbConn),
		family: family.New(dbConn),
		user:   user.New(dbConn),
		chore:  chore.New(dbConn),
	}
}

// System returns the system repo
func (i impl) System() system.Repository {
	return i.system
}

// Family returns the family repo
func (i impl) Family() family.Repository {
	return i.family
}

// User returns the user repo
func (i impl) User() user.Repository {
	return i.user
}

// Chore returns the chore repo
func (i impl) Chore() chore.Repository {
	return i.chore
}

// DoInTx wraps operations within a db tx
func (i impl) DoInTx(ctx context.Context, txFunc func(ctx context.Context, txRepo Registry) error, overrideBackoffPolicy backoff.BackOff) error {
	if i.tx != nil {
		return pkgerrors.WithStack(errNestedTx)
	}

	if overrideBackoffPolicy == nil {
		overrideBackoffPolicy = pg.ExponentialBackOff(3, time.Minute)
	}

	return pg.TxWithBackOff(ctx, overrideBackoffPolicy, i.dbConn, func(tx pg.ContextExecutor) error {
		newI := impl{
			tx:     tx,
			system: system.New(tx),
			family: family.New(tx),
			user:   user.New(tx),
			chore:  chore.New(tx),
		}
		return txFunc(ctx, newI)
	})
}
