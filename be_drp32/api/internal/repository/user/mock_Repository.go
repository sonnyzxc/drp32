// Code generated by mockery v2.43.2. DO NOT EDIT.

package user

import (
	context "context"

	model "github.com/sonnyzxc/drp/be_drp32/api/internal/controller/model"
	mock "github.com/stretchr/testify/mock"
)

// MockRepository is an autogenerated mock type for the Repository type
type MockRepository struct {
	mock.Mock
}

// CreateUser provides a mock function with given fields: ctx, user
func (_m *MockRepository) CreateUser(ctx context.Context, user model.User) error {
	ret := _m.Called(ctx, user)

	if len(ret) == 0 {
		panic("no return value specified for CreateUser")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, model.User) error); ok {
		r0 = rf(ctx, user)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// GetUserByEmail provides a mock function with given fields: ctx, email
func (_m *MockRepository) GetUserByEmail(ctx context.Context, email string) (model.User, error) {
	ret := _m.Called(ctx, email)

	if len(ret) == 0 {
		panic("no return value specified for GetUserByEmail")
	}

	var r0 model.User
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string) (model.User, error)); ok {
		return rf(ctx, email)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string) model.User); ok {
		r0 = rf(ctx, email)
	} else {
		r0 = ret.Get(0).(model.User)
	}

	if rf, ok := ret.Get(1).(func(context.Context, string) error); ok {
		r1 = rf(ctx, email)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetUserByID provides a mock function with given fields: ctx, id
func (_m *MockRepository) GetUserByID(ctx context.Context, id int64) (model.User, error) {
	ret := _m.Called(ctx, id)

	if len(ret) == 0 {
		panic("no return value specified for GetUserByID")
	}

	var r0 model.User
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, int64) (model.User, error)); ok {
		return rf(ctx, id)
	}
	if rf, ok := ret.Get(0).(func(context.Context, int64) model.User); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Get(0).(model.User)
	}

	if rf, ok := ret.Get(1).(func(context.Context, int64) error); ok {
		r1 = rf(ctx, id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
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