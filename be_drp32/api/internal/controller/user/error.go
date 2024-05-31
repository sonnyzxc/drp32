package user

import (
	"github.com/pkg/errors"
)

var (
	ErrAlreadyCreated = errors.New("user already created")
	ErrFamilyNotFound = errors.New("family not found")
)
