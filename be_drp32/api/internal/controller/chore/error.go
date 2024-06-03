package chore

import "github.com/pkg/errors"

var (
	ErrChoreCompleted = errors.New("chore already completed")
	ErrChoreNotFound  = errors.New("chore not found")
)
