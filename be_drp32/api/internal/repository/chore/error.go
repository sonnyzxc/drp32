package chore

import "github.com/pkg/errors"

var (
	ErrChoreIDNotFound = errors.New("chore ID not found in database")
)
