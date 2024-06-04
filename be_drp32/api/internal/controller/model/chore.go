package model

import (
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository/orm"
	"time"
)

type Chore struct {
	ChoreID     int64     `boil:"chore_id" json:"chore_id" toml:"chore_id" yaml:"chore_id"`
	Description string    `boil:"description" json:"description" toml:"description" yaml:"description"`
	Emoji       string    `boil:"emoji" json:"emoji" toml:"emoji" yaml:"emoji"`
	Points      int       `boil:"points" json:"points" toml:"points" yaml:"points"`
	Completed   bool      `boil:"completed" json:"completed" toml:"completed" yaml:"completed"`
	AssignedTo  int64     `boil:"assigned_to" json:"assigned_to" toml:"assigned_to" yaml:"assigned_to"`
	DueDate     time.Time `boil:"due_date" json:"due_date" toml:"due_date" yaml:"due_date"`
}

type Chores []Chore

func (c Chore) Orm() *orm.Chore {
	return &orm.Chore{
		ChoreID:     c.ChoreID,
		Description: c.Description,
		Emoji:       c.Emoji,
		Points:      c.Points,
		Completed:   c.Completed,
		AssignedTo:  c.AssignedTo,
		DueDate:     c.DueDate,
	}
}
