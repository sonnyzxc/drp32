package choredetails

import "github.com/volatiletech/null/v8"

type Request struct {
	Description string      `json:"description"`
	Emoji       string      `json:"emoji"`
	Points      int         `json:"points"`
	AssignedTo  null.Int64  `json:"assigned-to,omitempty"`
	DueDate     null.String `json:"due-date,omitempty"`
	Recurring   null.Int    `json:"recurring,omitempty"`
}
