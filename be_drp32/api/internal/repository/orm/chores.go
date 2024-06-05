// Code generated by SQLBoiler 4.15.0 (https://github.com/volatiletech/sqlboiler). DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package orm

import (
	"context"
	"database/sql"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/friendsofgo/errors"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"github.com/volatiletech/sqlboiler/v4/queries/qmhelper"
	"github.com/volatiletech/strmangle"
)

// Chore is an object representing the database table.
type Chore struct {
	ChoreID       int64       `boil:"chore_id" json:"chore_id" toml:"chore_id" yaml:"chore_id"`
	Description   string      `boil:"description" json:"description" toml:"description" yaml:"description"`
	Emoji         string      `boil:"emoji" json:"emoji" toml:"emoji" yaml:"emoji"`
	Points        int         `boil:"points" json:"points" toml:"points" yaml:"points"`
	Completed     bool        `boil:"completed" json:"completed" toml:"completed" yaml:"completed"`
	AssignedTo    int64       `boil:"assigned_to" json:"assigned_to" toml:"assigned_to" yaml:"assigned_to"`
	DueDate       time.Time   `boil:"due_date" json:"due_date" toml:"due_date" yaml:"due_date"`
	TimeCompleted null.Time   `boil:"time_completed" json:"time_completed,omitempty" toml:"time_completed" yaml:"time_completed,omitempty"`
	ImgDir        null.String `boil:"img_dir" json:"img_dir,omitempty" toml:"img_dir" yaml:"img_dir,omitempty"`

	R *choreR `boil:"-" json:"-" toml:"-" yaml:"-"`
	L choreL  `boil:"-" json:"-" toml:"-" yaml:"-"`
}

var ChoreColumns = struct {
	ChoreID       string
	Description   string
	Emoji         string
	Points        string
	Completed     string
	AssignedTo    string
	DueDate       string
	TimeCompleted string
	ImgDir        string
}{
	ChoreID:       "chore_id",
	Description:   "description",
	Emoji:         "emoji",
	Points:        "points",
	Completed:     "completed",
	AssignedTo:    "assigned_to",
	DueDate:       "due_date",
	TimeCompleted: "time_completed",
	ImgDir:        "img_dir",
}

var ChoreTableColumns = struct {
	ChoreID       string
	Description   string
	Emoji         string
	Points        string
	Completed     string
	AssignedTo    string
	DueDate       string
	TimeCompleted string
	ImgDir        string
}{
	ChoreID:       "chores.chore_id",
	Description:   "chores.description",
	Emoji:         "chores.emoji",
	Points:        "chores.points",
	Completed:     "chores.completed",
	AssignedTo:    "chores.assigned_to",
	DueDate:       "chores.due_date",
	TimeCompleted: "chores.time_completed",
	ImgDir:        "chores.img_dir",
}

// Generated where

type whereHelperint64 struct{ field string }

func (w whereHelperint64) EQ(x int64) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.EQ, x) }
func (w whereHelperint64) NEQ(x int64) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.NEQ, x) }
func (w whereHelperint64) LT(x int64) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.LT, x) }
func (w whereHelperint64) LTE(x int64) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.LTE, x) }
func (w whereHelperint64) GT(x int64) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.GT, x) }
func (w whereHelperint64) GTE(x int64) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.GTE, x) }
func (w whereHelperint64) IN(slice []int64) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereIn(fmt.Sprintf("%s IN ?", w.field), values...)
}
func (w whereHelperint64) NIN(slice []int64) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereNotIn(fmt.Sprintf("%s NOT IN ?", w.field), values...)
}

type whereHelperstring struct{ field string }

func (w whereHelperstring) EQ(x string) qm.QueryMod     { return qmhelper.Where(w.field, qmhelper.EQ, x) }
func (w whereHelperstring) NEQ(x string) qm.QueryMod    { return qmhelper.Where(w.field, qmhelper.NEQ, x) }
func (w whereHelperstring) LT(x string) qm.QueryMod     { return qmhelper.Where(w.field, qmhelper.LT, x) }
func (w whereHelperstring) LTE(x string) qm.QueryMod    { return qmhelper.Where(w.field, qmhelper.LTE, x) }
func (w whereHelperstring) GT(x string) qm.QueryMod     { return qmhelper.Where(w.field, qmhelper.GT, x) }
func (w whereHelperstring) GTE(x string) qm.QueryMod    { return qmhelper.Where(w.field, qmhelper.GTE, x) }
func (w whereHelperstring) LIKE(x string) qm.QueryMod   { return qm.Where(w.field+" LIKE ?", x) }
func (w whereHelperstring) NLIKE(x string) qm.QueryMod  { return qm.Where(w.field+" NOT LIKE ?", x) }
func (w whereHelperstring) ILIKE(x string) qm.QueryMod  { return qm.Where(w.field+" ILIKE ?", x) }
func (w whereHelperstring) NILIKE(x string) qm.QueryMod { return qm.Where(w.field+" NOT ILIKE ?", x) }
func (w whereHelperstring) IN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereIn(fmt.Sprintf("%s IN ?", w.field), values...)
}
func (w whereHelperstring) NIN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereNotIn(fmt.Sprintf("%s NOT IN ?", w.field), values...)
}

type whereHelperint struct{ field string }

func (w whereHelperint) EQ(x int) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.EQ, x) }
func (w whereHelperint) NEQ(x int) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.NEQ, x) }
func (w whereHelperint) LT(x int) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.LT, x) }
func (w whereHelperint) LTE(x int) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.LTE, x) }
func (w whereHelperint) GT(x int) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.GT, x) }
func (w whereHelperint) GTE(x int) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.GTE, x) }
func (w whereHelperint) IN(slice []int) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereIn(fmt.Sprintf("%s IN ?", w.field), values...)
}
func (w whereHelperint) NIN(slice []int) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereNotIn(fmt.Sprintf("%s NOT IN ?", w.field), values...)
}

type whereHelperbool struct{ field string }

func (w whereHelperbool) EQ(x bool) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.EQ, x) }
func (w whereHelperbool) NEQ(x bool) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.NEQ, x) }
func (w whereHelperbool) LT(x bool) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.LT, x) }
func (w whereHelperbool) LTE(x bool) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.LTE, x) }
func (w whereHelperbool) GT(x bool) qm.QueryMod  { return qmhelper.Where(w.field, qmhelper.GT, x) }
func (w whereHelperbool) GTE(x bool) qm.QueryMod { return qmhelper.Where(w.field, qmhelper.GTE, x) }

type whereHelpertime_Time struct{ field string }

func (w whereHelpertime_Time) EQ(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.EQ, x)
}
func (w whereHelpertime_Time) NEQ(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.NEQ, x)
}
func (w whereHelpertime_Time) LT(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LT, x)
}
func (w whereHelpertime_Time) LTE(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LTE, x)
}
func (w whereHelpertime_Time) GT(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GT, x)
}
func (w whereHelpertime_Time) GTE(x time.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GTE, x)
}

type whereHelpernull_Time struct{ field string }

func (w whereHelpernull_Time) EQ(x null.Time) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, false, x)
}
func (w whereHelpernull_Time) NEQ(x null.Time) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, true, x)
}
func (w whereHelpernull_Time) LT(x null.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LT, x)
}
func (w whereHelpernull_Time) LTE(x null.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LTE, x)
}
func (w whereHelpernull_Time) GT(x null.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GT, x)
}
func (w whereHelpernull_Time) GTE(x null.Time) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GTE, x)
}

func (w whereHelpernull_Time) IsNull() qm.QueryMod    { return qmhelper.WhereIsNull(w.field) }
func (w whereHelpernull_Time) IsNotNull() qm.QueryMod { return qmhelper.WhereIsNotNull(w.field) }

type whereHelpernull_String struct{ field string }

func (w whereHelpernull_String) EQ(x null.String) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, false, x)
}
func (w whereHelpernull_String) NEQ(x null.String) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, true, x)
}
func (w whereHelpernull_String) LT(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LT, x)
}
func (w whereHelpernull_String) LTE(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LTE, x)
}
func (w whereHelpernull_String) GT(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GT, x)
}
func (w whereHelpernull_String) GTE(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GTE, x)
}
func (w whereHelpernull_String) LIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" LIKE ?", x)
}
func (w whereHelpernull_String) NLIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" NOT LIKE ?", x)
}
func (w whereHelpernull_String) ILIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" ILIKE ?", x)
}
func (w whereHelpernull_String) NILIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" NOT ILIKE ?", x)
}
func (w whereHelpernull_String) IN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereIn(fmt.Sprintf("%s IN ?", w.field), values...)
}
func (w whereHelpernull_String) NIN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereNotIn(fmt.Sprintf("%s NOT IN ?", w.field), values...)
}

func (w whereHelpernull_String) IsNull() qm.QueryMod    { return qmhelper.WhereIsNull(w.field) }
func (w whereHelpernull_String) IsNotNull() qm.QueryMod { return qmhelper.WhereIsNotNull(w.field) }

var ChoreWhere = struct {
	ChoreID       whereHelperint64
	Description   whereHelperstring
	Emoji         whereHelperstring
	Points        whereHelperint
	Completed     whereHelperbool
	AssignedTo    whereHelperint64
	DueDate       whereHelpertime_Time
	TimeCompleted whereHelpernull_Time
	ImgDir        whereHelpernull_String
}{
	ChoreID:       whereHelperint64{field: "\"chores\".\"chore_id\""},
	Description:   whereHelperstring{field: "\"chores\".\"description\""},
	Emoji:         whereHelperstring{field: "\"chores\".\"emoji\""},
	Points:        whereHelperint{field: "\"chores\".\"points\""},
	Completed:     whereHelperbool{field: "\"chores\".\"completed\""},
	AssignedTo:    whereHelperint64{field: "\"chores\".\"assigned_to\""},
	DueDate:       whereHelpertime_Time{field: "\"chores\".\"due_date\""},
	TimeCompleted: whereHelpernull_Time{field: "\"chores\".\"time_completed\""},
	ImgDir:        whereHelpernull_String{field: "\"chores\".\"img_dir\""},
}

// ChoreRels is where relationship names are stored.
var ChoreRels = struct {
	AssignedToUser string
}{
	AssignedToUser: "AssignedToUser",
}

// choreR is where relationships are stored.
type choreR struct {
	AssignedToUser *User `boil:"AssignedToUser" json:"AssignedToUser" toml:"AssignedToUser" yaml:"AssignedToUser"`
}

// NewStruct creates a new relationship struct
func (*choreR) NewStruct() *choreR {
	return &choreR{}
}

func (r *choreR) GetAssignedToUser() *User {
	if r == nil {
		return nil
	}
	return r.AssignedToUser
}

// choreL is where Load methods for each relationship are stored.
type choreL struct{}

var (
	choreAllColumns            = []string{"chore_id", "description", "emoji", "points", "completed", "assigned_to", "due_date", "time_completed", "img_dir"}
	choreColumnsWithoutDefault = []string{"description", "emoji", "points", "completed", "assigned_to", "due_date"}
	choreColumnsWithDefault    = []string{"chore_id", "time_completed", "img_dir"}
	chorePrimaryKeyColumns     = []string{"chore_id"}
	choreGeneratedColumns      = []string{}
)

type (
	// ChoreSlice is an alias for a slice of pointers to Chore.
	// This should almost always be used instead of []Chore.
	ChoreSlice []*Chore
	// ChoreHook is the signature for custom Chore hook methods
	ChoreHook func(context.Context, boil.ContextExecutor, *Chore) error

	choreQuery struct {
		*queries.Query
	}
)

// Cache for insert, update and upsert
var (
	choreType                 = reflect.TypeOf(&Chore{})
	choreMapping              = queries.MakeStructMapping(choreType)
	chorePrimaryKeyMapping, _ = queries.BindMapping(choreType, choreMapping, chorePrimaryKeyColumns)
	choreInsertCacheMut       sync.RWMutex
	choreInsertCache          = make(map[string]insertCache)
	choreUpdateCacheMut       sync.RWMutex
	choreUpdateCache          = make(map[string]updateCache)
	choreUpsertCacheMut       sync.RWMutex
	choreUpsertCache          = make(map[string]insertCache)
)

var (
	// Force time package dependency for automated UpdatedAt/CreatedAt.
	_ = time.Second
	// Force qmhelper dependency for where clause generation (which doesn't
	// always happen)
	_ = qmhelper.Where
)

var choreAfterSelectHooks []ChoreHook

var choreBeforeInsertHooks []ChoreHook
var choreAfterInsertHooks []ChoreHook

var choreBeforeUpdateHooks []ChoreHook
var choreAfterUpdateHooks []ChoreHook

var choreBeforeDeleteHooks []ChoreHook
var choreAfterDeleteHooks []ChoreHook

var choreBeforeUpsertHooks []ChoreHook
var choreAfterUpsertHooks []ChoreHook

// doAfterSelectHooks executes all "after Select" hooks.
func (o *Chore) doAfterSelectHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range choreAfterSelectHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeInsertHooks executes all "before insert" hooks.
func (o *Chore) doBeforeInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range choreBeforeInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterInsertHooks executes all "after Insert" hooks.
func (o *Chore) doAfterInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range choreAfterInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpdateHooks executes all "before Update" hooks.
func (o *Chore) doBeforeUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range choreBeforeUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpdateHooks executes all "after Update" hooks.
func (o *Chore) doAfterUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range choreAfterUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeDeleteHooks executes all "before Delete" hooks.
func (o *Chore) doBeforeDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range choreBeforeDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterDeleteHooks executes all "after Delete" hooks.
func (o *Chore) doAfterDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range choreAfterDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpsertHooks executes all "before Upsert" hooks.
func (o *Chore) doBeforeUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range choreBeforeUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpsertHooks executes all "after Upsert" hooks.
func (o *Chore) doAfterUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range choreAfterUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// AddChoreHook registers your hook function for all future operations.
func AddChoreHook(hookPoint boil.HookPoint, choreHook ChoreHook) {
	switch hookPoint {
	case boil.AfterSelectHook:
		choreAfterSelectHooks = append(choreAfterSelectHooks, choreHook)
	case boil.BeforeInsertHook:
		choreBeforeInsertHooks = append(choreBeforeInsertHooks, choreHook)
	case boil.AfterInsertHook:
		choreAfterInsertHooks = append(choreAfterInsertHooks, choreHook)
	case boil.BeforeUpdateHook:
		choreBeforeUpdateHooks = append(choreBeforeUpdateHooks, choreHook)
	case boil.AfterUpdateHook:
		choreAfterUpdateHooks = append(choreAfterUpdateHooks, choreHook)
	case boil.BeforeDeleteHook:
		choreBeforeDeleteHooks = append(choreBeforeDeleteHooks, choreHook)
	case boil.AfterDeleteHook:
		choreAfterDeleteHooks = append(choreAfterDeleteHooks, choreHook)
	case boil.BeforeUpsertHook:
		choreBeforeUpsertHooks = append(choreBeforeUpsertHooks, choreHook)
	case boil.AfterUpsertHook:
		choreAfterUpsertHooks = append(choreAfterUpsertHooks, choreHook)
	}
}

// One returns a single chore record from the query.
func (q choreQuery) One(ctx context.Context, exec boil.ContextExecutor) (*Chore, error) {
	o := &Chore{}

	queries.SetLimit(q.Query, 1)

	err := q.Bind(ctx, exec, o)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "orm: failed to execute a one query for chores")
	}

	if err := o.doAfterSelectHooks(ctx, exec); err != nil {
		return o, err
	}

	return o, nil
}

// All returns all Chore records from the query.
func (q choreQuery) All(ctx context.Context, exec boil.ContextExecutor) (ChoreSlice, error) {
	var o []*Chore

	err := q.Bind(ctx, exec, &o)
	if err != nil {
		return nil, errors.Wrap(err, "orm: failed to assign all query results to Chore slice")
	}

	if len(choreAfterSelectHooks) != 0 {
		for _, obj := range o {
			if err := obj.doAfterSelectHooks(ctx, exec); err != nil {
				return o, err
			}
		}
	}

	return o, nil
}

// Count returns the count of all Chore records in the query.
func (q choreQuery) Count(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return 0, errors.Wrap(err, "orm: failed to count chores rows")
	}

	return count, nil
}

// Exists checks if the row exists in the table.
func (q choreQuery) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)
	queries.SetLimit(q.Query, 1)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return false, errors.Wrap(err, "orm: failed to check if chores exists")
	}

	return count > 0, nil
}

// AssignedToUser pointed to by the foreign key.
func (o *Chore) AssignedToUser(mods ...qm.QueryMod) userQuery {
	queryMods := []qm.QueryMod{
		qm.Where("\"user_id\" = ?", o.AssignedTo),
	}

	queryMods = append(queryMods, mods...)

	return Users(queryMods...)
}

// LoadAssignedToUser allows an eager lookup of values, cached into the
// loaded structs of the objects. This is for an N-1 relationship.
func (choreL) LoadAssignedToUser(ctx context.Context, e boil.ContextExecutor, singular bool, maybeChore interface{}, mods queries.Applicator) error {
	var slice []*Chore
	var object *Chore

	if singular {
		var ok bool
		object, ok = maybeChore.(*Chore)
		if !ok {
			object = new(Chore)
			ok = queries.SetFromEmbeddedStruct(&object, &maybeChore)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", object, maybeChore))
			}
		}
	} else {
		s, ok := maybeChore.(*[]*Chore)
		if ok {
			slice = *s
		} else {
			ok = queries.SetFromEmbeddedStruct(&slice, maybeChore)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", slice, maybeChore))
			}
		}
	}

	args := make([]interface{}, 0, 1)
	if singular {
		if object.R == nil {
			object.R = &choreR{}
		}
		args = append(args, object.AssignedTo)

	} else {
	Outer:
		for _, obj := range slice {
			if obj.R == nil {
				obj.R = &choreR{}
			}

			for _, a := range args {
				if a == obj.AssignedTo {
					continue Outer
				}
			}

			args = append(args, obj.AssignedTo)

		}
	}

	if len(args) == 0 {
		return nil
	}

	query := NewQuery(
		qm.From(`users`),
		qm.WhereIn(`users.user_id in ?`, args...),
	)
	if mods != nil {
		mods.Apply(query)
	}

	results, err := query.QueryContext(ctx, e)
	if err != nil {
		return errors.Wrap(err, "failed to eager load User")
	}

	var resultSlice []*User
	if err = queries.Bind(results, &resultSlice); err != nil {
		return errors.Wrap(err, "failed to bind eager loaded slice User")
	}

	if err = results.Close(); err != nil {
		return errors.Wrap(err, "failed to close results of eager load for users")
	}
	if err = results.Err(); err != nil {
		return errors.Wrap(err, "error occurred during iteration of eager loaded relations for users")
	}

	if len(userAfterSelectHooks) != 0 {
		for _, obj := range resultSlice {
			if err := obj.doAfterSelectHooks(ctx, e); err != nil {
				return err
			}
		}
	}

	if len(resultSlice) == 0 {
		return nil
	}

	if singular {
		foreign := resultSlice[0]
		object.R.AssignedToUser = foreign
		if foreign.R == nil {
			foreign.R = &userR{}
		}
		foreign.R.AssignedToChores = append(foreign.R.AssignedToChores, object)
		return nil
	}

	for _, local := range slice {
		for _, foreign := range resultSlice {
			if local.AssignedTo == foreign.UserID {
				local.R.AssignedToUser = foreign
				if foreign.R == nil {
					foreign.R = &userR{}
				}
				foreign.R.AssignedToChores = append(foreign.R.AssignedToChores, local)
				break
			}
		}
	}

	return nil
}

// SetAssignedToUser of the chore to the related item.
// Sets o.R.AssignedToUser to related.
// Adds o to related.R.AssignedToChores.
func (o *Chore) SetAssignedToUser(ctx context.Context, exec boil.ContextExecutor, insert bool, related *User) error {
	var err error
	if insert {
		if err = related.Insert(ctx, exec, boil.Infer()); err != nil {
			return errors.Wrap(err, "failed to insert into foreign table")
		}
	}

	updateQuery := fmt.Sprintf(
		"UPDATE \"chores\" SET %s WHERE %s",
		strmangle.SetParamNames("\"", "\"", 1, []string{"assigned_to"}),
		strmangle.WhereClause("\"", "\"", 2, chorePrimaryKeyColumns),
	)
	values := []interface{}{related.UserID, o.ChoreID}

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, updateQuery)
		fmt.Fprintln(writer, values)
	}
	if _, err = exec.ExecContext(ctx, updateQuery, values...); err != nil {
		return errors.Wrap(err, "failed to update local table")
	}

	o.AssignedTo = related.UserID
	if o.R == nil {
		o.R = &choreR{
			AssignedToUser: related,
		}
	} else {
		o.R.AssignedToUser = related
	}

	if related.R == nil {
		related.R = &userR{
			AssignedToChores: ChoreSlice{o},
		}
	} else {
		related.R.AssignedToChores = append(related.R.AssignedToChores, o)
	}

	return nil
}

// Chores retrieves all the records using an executor.
func Chores(mods ...qm.QueryMod) choreQuery {
	mods = append(mods, qm.From("\"chores\""))
	q := NewQuery(mods...)
	if len(queries.GetSelect(q)) == 0 {
		queries.SetSelect(q, []string{"\"chores\".*"})
	}

	return choreQuery{q}
}

// FindChore retrieves a single record by ID with an executor.
// If selectCols is empty Find will return all columns.
func FindChore(ctx context.Context, exec boil.ContextExecutor, choreID int64, selectCols ...string) (*Chore, error) {
	choreObj := &Chore{}

	sel := "*"
	if len(selectCols) > 0 {
		sel = strings.Join(strmangle.IdentQuoteSlice(dialect.LQ, dialect.RQ, selectCols), ",")
	}
	query := fmt.Sprintf(
		"select %s from \"chores\" where \"chore_id\"=$1", sel,
	)

	q := queries.Raw(query, choreID)

	err := q.Bind(ctx, exec, choreObj)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "orm: unable to select from chores")
	}

	if err = choreObj.doAfterSelectHooks(ctx, exec); err != nil {
		return choreObj, err
	}

	return choreObj, nil
}

// Insert a single record using an executor.
// See boil.Columns.InsertColumnSet documentation to understand column list inference for inserts.
func (o *Chore) Insert(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) error {
	if o == nil {
		return errors.New("orm: no chores provided for insertion")
	}

	var err error

	if err := o.doBeforeInsertHooks(ctx, exec); err != nil {
		return err
	}

	nzDefaults := queries.NonZeroDefaultSet(choreColumnsWithDefault, o)

	key := makeCacheKey(columns, nzDefaults)
	choreInsertCacheMut.RLock()
	cache, cached := choreInsertCache[key]
	choreInsertCacheMut.RUnlock()

	if !cached {
		wl, returnColumns := columns.InsertColumnSet(
			choreAllColumns,
			choreColumnsWithDefault,
			choreColumnsWithoutDefault,
			nzDefaults,
		)

		cache.valueMapping, err = queries.BindMapping(choreType, choreMapping, wl)
		if err != nil {
			return err
		}
		cache.retMapping, err = queries.BindMapping(choreType, choreMapping, returnColumns)
		if err != nil {
			return err
		}
		if len(wl) != 0 {
			cache.query = fmt.Sprintf("INSERT INTO \"chores\" (\"%s\") %%sVALUES (%s)%%s", strings.Join(wl, "\",\""), strmangle.Placeholders(dialect.UseIndexPlaceholders, len(wl), 1, 1))
		} else {
			cache.query = "INSERT INTO \"chores\" %sDEFAULT VALUES%s"
		}

		var queryOutput, queryReturning string

		if len(cache.retMapping) != 0 {
			queryReturning = fmt.Sprintf(" RETURNING \"%s\"", strings.Join(returnColumns, "\",\""))
		}

		cache.query = fmt.Sprintf(cache.query, queryOutput, queryReturning)
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	vals := queries.ValuesFromMapping(value, cache.valueMapping)

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, vals)
	}

	if len(cache.retMapping) != 0 {
		err = exec.QueryRowContext(ctx, cache.query, vals...).Scan(queries.PtrsFromMapping(value, cache.retMapping)...)
	} else {
		_, err = exec.ExecContext(ctx, cache.query, vals...)
	}

	if err != nil {
		return errors.Wrap(err, "orm: unable to insert into chores")
	}

	if !cached {
		choreInsertCacheMut.Lock()
		choreInsertCache[key] = cache
		choreInsertCacheMut.Unlock()
	}

	return o.doAfterInsertHooks(ctx, exec)
}

// Update uses an executor to update the Chore.
// See boil.Columns.UpdateColumnSet documentation to understand column list inference for updates.
// Update does not automatically update the record in case of default values. Use .Reload() to refresh the records.
func (o *Chore) Update(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) (int64, error) {
	var err error
	if err = o.doBeforeUpdateHooks(ctx, exec); err != nil {
		return 0, err
	}
	key := makeCacheKey(columns, nil)
	choreUpdateCacheMut.RLock()
	cache, cached := choreUpdateCache[key]
	choreUpdateCacheMut.RUnlock()

	if !cached {
		wl := columns.UpdateColumnSet(
			choreAllColumns,
			chorePrimaryKeyColumns,
		)

		if !columns.IsWhitelist() {
			wl = strmangle.SetComplement(wl, []string{"created_at"})
		}
		if len(wl) == 0 {
			return 0, errors.New("orm: unable to update chores, could not build whitelist")
		}

		cache.query = fmt.Sprintf("UPDATE \"chores\" SET %s WHERE %s",
			strmangle.SetParamNames("\"", "\"", 1, wl),
			strmangle.WhereClause("\"", "\"", len(wl)+1, chorePrimaryKeyColumns),
		)
		cache.valueMapping, err = queries.BindMapping(choreType, choreMapping, append(wl, chorePrimaryKeyColumns...))
		if err != nil {
			return 0, err
		}
	}

	values := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(o)), cache.valueMapping)

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, values)
	}
	var result sql.Result
	result, err = exec.ExecContext(ctx, cache.query, values...)
	if err != nil {
		return 0, errors.Wrap(err, "orm: unable to update chores row")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "orm: failed to get rows affected by update for chores")
	}

	if !cached {
		choreUpdateCacheMut.Lock()
		choreUpdateCache[key] = cache
		choreUpdateCacheMut.Unlock()
	}

	return rowsAff, o.doAfterUpdateHooks(ctx, exec)
}

// UpdateAll updates all rows with the specified column values.
func (q choreQuery) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
	queries.SetUpdate(q.Query, cols)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "orm: unable to update all for chores")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "orm: unable to retrieve rows affected for chores")
	}

	return rowsAff, nil
}

// UpdateAll updates all rows with the specified column values, using an executor.
func (o ChoreSlice) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
	ln := int64(len(o))
	if ln == 0 {
		return 0, nil
	}

	if len(cols) == 0 {
		return 0, errors.New("orm: update all requires at least one column argument")
	}

	colNames := make([]string, len(cols))
	args := make([]interface{}, len(cols))

	i := 0
	for name, value := range cols {
		colNames[i] = name
		args[i] = value
		i++
	}

	// Append all of the primary key values for each column
	for _, obj := range o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), chorePrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := fmt.Sprintf("UPDATE \"chores\" SET %s WHERE %s",
		strmangle.SetParamNames("\"", "\"", 1, colNames),
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), len(colNames)+1, chorePrimaryKeyColumns, len(o)))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "orm: unable to update all in chore slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "orm: unable to retrieve rows affected all in update all chore")
	}
	return rowsAff, nil
}

// Upsert attempts an insert using an executor, and does an update or ignore on conflict.
// See boil.Columns documentation for how to properly use updateColumns and insertColumns.
func (o *Chore) Upsert(ctx context.Context, exec boil.ContextExecutor, updateOnConflict bool, conflictColumns []string, updateColumns, insertColumns boil.Columns) error {
	if o == nil {
		return errors.New("orm: no chores provided for upsert")
	}

	if err := o.doBeforeUpsertHooks(ctx, exec); err != nil {
		return err
	}

	nzDefaults := queries.NonZeroDefaultSet(choreColumnsWithDefault, o)

	// Build cache key in-line uglily - mysql vs psql problems
	buf := strmangle.GetBuffer()
	if updateOnConflict {
		buf.WriteByte('t')
	} else {
		buf.WriteByte('f')
	}
	buf.WriteByte('.')
	for _, c := range conflictColumns {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	buf.WriteString(strconv.Itoa(updateColumns.Kind))
	for _, c := range updateColumns.Cols {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	buf.WriteString(strconv.Itoa(insertColumns.Kind))
	for _, c := range insertColumns.Cols {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	for _, c := range nzDefaults {
		buf.WriteString(c)
	}
	key := buf.String()
	strmangle.PutBuffer(buf)

	choreUpsertCacheMut.RLock()
	cache, cached := choreUpsertCache[key]
	choreUpsertCacheMut.RUnlock()

	var err error

	if !cached {
		insert, ret := insertColumns.InsertColumnSet(
			choreAllColumns,
			choreColumnsWithDefault,
			choreColumnsWithoutDefault,
			nzDefaults,
		)

		update := updateColumns.UpdateColumnSet(
			choreAllColumns,
			chorePrimaryKeyColumns,
		)

		if updateOnConflict && len(update) == 0 {
			return errors.New("orm: unable to upsert chores, could not build update column list")
		}

		conflict := conflictColumns
		if len(conflict) == 0 {
			conflict = make([]string, len(chorePrimaryKeyColumns))
			copy(conflict, chorePrimaryKeyColumns)
		}
		cache.query = buildUpsertQueryPostgres(dialect, "\"chores\"", updateOnConflict, ret, update, conflict, insert)

		cache.valueMapping, err = queries.BindMapping(choreType, choreMapping, insert)
		if err != nil {
			return err
		}
		if len(ret) != 0 {
			cache.retMapping, err = queries.BindMapping(choreType, choreMapping, ret)
			if err != nil {
				return err
			}
		}
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	vals := queries.ValuesFromMapping(value, cache.valueMapping)
	var returns []interface{}
	if len(cache.retMapping) != 0 {
		returns = queries.PtrsFromMapping(value, cache.retMapping)
	}

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, vals)
	}
	if len(cache.retMapping) != 0 {
		err = exec.QueryRowContext(ctx, cache.query, vals...).Scan(returns...)
		if errors.Is(err, sql.ErrNoRows) {
			err = nil // Postgres doesn't return anything when there's no update
		}
	} else {
		_, err = exec.ExecContext(ctx, cache.query, vals...)
	}
	if err != nil {
		return errors.Wrap(err, "orm: unable to upsert chores")
	}

	if !cached {
		choreUpsertCacheMut.Lock()
		choreUpsertCache[key] = cache
		choreUpsertCacheMut.Unlock()
	}

	return o.doAfterUpsertHooks(ctx, exec)
}

// Delete deletes a single Chore record with an executor.
// Delete will match against the primary key column to find the record to delete.
func (o *Chore) Delete(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if o == nil {
		return 0, errors.New("orm: no Chore provided for delete")
	}

	if err := o.doBeforeDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	args := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(o)), chorePrimaryKeyMapping)
	sql := "DELETE FROM \"chores\" WHERE \"chore_id\"=$1"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "orm: unable to delete from chores")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "orm: failed to get rows affected by delete for chores")
	}

	if err := o.doAfterDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	return rowsAff, nil
}

// DeleteAll deletes all matching rows.
func (q choreQuery) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if q.Query == nil {
		return 0, errors.New("orm: no choreQuery provided for delete all")
	}

	queries.SetDelete(q.Query)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "orm: unable to delete all from chores")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "orm: failed to get rows affected by deleteall for chores")
	}

	return rowsAff, nil
}

// DeleteAll deletes all rows in the slice, using an executor.
func (o ChoreSlice) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if len(o) == 0 {
		return 0, nil
	}

	if len(choreBeforeDeleteHooks) != 0 {
		for _, obj := range o {
			if err := obj.doBeforeDeleteHooks(ctx, exec); err != nil {
				return 0, err
			}
		}
	}

	var args []interface{}
	for _, obj := range o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), chorePrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "DELETE FROM \"chores\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, chorePrimaryKeyColumns, len(o))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "orm: unable to delete all from chore slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "orm: failed to get rows affected by deleteall for chores")
	}

	if len(choreAfterDeleteHooks) != 0 {
		for _, obj := range o {
			if err := obj.doAfterDeleteHooks(ctx, exec); err != nil {
				return 0, err
			}
		}
	}

	return rowsAff, nil
}

// Reload refetches the object from the database
// using the primary keys with an executor.
func (o *Chore) Reload(ctx context.Context, exec boil.ContextExecutor) error {
	ret, err := FindChore(ctx, exec, o.ChoreID)
	if err != nil {
		return err
	}

	*o = *ret
	return nil
}

// ReloadAll refetches every row with matching primary key column values
// and overwrites the original object slice with the newly updated slice.
func (o *ChoreSlice) ReloadAll(ctx context.Context, exec boil.ContextExecutor) error {
	if o == nil || len(*o) == 0 {
		return nil
	}

	slice := ChoreSlice{}
	var args []interface{}
	for _, obj := range *o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), chorePrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "SELECT \"chores\".* FROM \"chores\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, chorePrimaryKeyColumns, len(*o))

	q := queries.Raw(sql, args...)

	err := q.Bind(ctx, exec, &slice)
	if err != nil {
		return errors.Wrap(err, "orm: unable to reload all in ChoreSlice")
	}

	*o = slice

	return nil
}

// ChoreExists checks if the Chore row exists.
func ChoreExists(ctx context.Context, exec boil.ContextExecutor, choreID int64) (bool, error) {
	var exists bool
	sql := "select exists(select 1 from \"chores\" where \"chore_id\"=$1 limit 1)"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, choreID)
	}
	row := exec.QueryRowContext(ctx, sql, choreID)

	err := row.Scan(&exists)
	if err != nil {
		return false, errors.Wrap(err, "orm: unable to check if chores exists")
	}

	return exists, nil
}

// Exists checks if the Chore row exists.
func (o *Chore) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	return ChoreExists(ctx, exec, o.ChoreID)
}
