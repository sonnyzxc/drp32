// Code generated by mockery v2.43.2. DO NOT EDIT.

package chore

import (
	context "context"

	model "github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	mock "github.com/stretchr/testify/mock"
)

// MockRepository is an autogenerated mock type for the Repository type
type MockRepository struct {
	mock.Mock
}

// CreateChore provides a mock function with given fields: ctx, chore
func (_m *MockRepository) CreateChore(ctx context.Context, chore model.Chore) error {
	ret := _m.Called(ctx, chore)

	if len(ret) == 0 {
		panic("no return value specified for CreateChore")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, model.Chore) error); ok {
		r0 = rf(ctx, chore)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// NewMockRepository creates a new instance of MockRepository. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewMockRepository(t interface {
	mock.TestingT
	Cleanup(func())
}) *MockRepository {
	mock := &MockRepository{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}