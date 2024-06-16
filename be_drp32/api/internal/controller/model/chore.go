package model

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"
	"github.com/volatiletech/null/v8"
)

type Chore struct {
	ChoreID       int64       `boil:"chore_id" json:"chore_id" toml:"chore_id" yaml:"chore_id"`
	Description   string      `boil:"description" json:"description" toml:"description" yaml:"description"`
	Emoji         string      `boil:"emoji" json:"emoji" toml:"emoji" yaml:"emoji"`
	Points        int         `boil:"points" json:"points" toml:"points" yaml:"points"`
	Completed     bool        `boil:"completed" json:"completed" toml:"completed" yaml:"completed"`
	AssignedTo    null.Int64  `boil:"assigned_to" json:"assigned_to,omitempty" toml:"assigned_to" yaml:"assigned_to,omitempty"`
	DueDate       null.Time   `boil:"due_date" json:"due_date,omitempty" toml:"due_date" yaml:"due_date,omitempty"`
	TimeCompleted null.Time   `boil:"time_completed" json:"time_completed,omitempty" toml:"time_completed" yaml:"time_completed,omitempty"`
	ImgDir        null.String `boil:"img_dir" json:"img_dir,omitempty" toml:"img_dir" yaml:"img_dir,omitempty"`
	Recurring     int         `boil:"recurring" json:"recurring" toml:"recurring" yaml:"recurring"`
	Next          null.Int64  `boil:"next" json:"next,omitempty" toml:"next" yaml:"next,omitempty"`
}

type Chores []Chore

func (c Chore) Orm() *orm.Chore {
	return &orm.Chore{
		ChoreID:       c.ChoreID,
		Description:   c.Description,
		Emoji:         c.Emoji,
		Points:        c.Points,
		Completed:     c.Completed,
		AssignedTo:    c.AssignedTo,
		DueDate:       c.DueDate,
		TimeCompleted: c.TimeCompleted,
		ImgDir:        c.ImgDir,
		Recurring:     c.Recurring,
		Next:          c.Next,
	}
}

func ChoreModel(c *orm.Chore) Chore {
	return Chore{
		ChoreID:       c.ChoreID,
		Description:   c.Description,
		Emoji:         c.Emoji,
		Points:        c.Points,
		Completed:     c.Completed,
		AssignedTo:    c.AssignedTo,
		DueDate:       c.DueDate,
		TimeCompleted: c.TimeCompleted,
		ImgDir:        c.ImgDir,
		Recurring:     c.Recurring,
		Next:          c.Next,
	}
}
