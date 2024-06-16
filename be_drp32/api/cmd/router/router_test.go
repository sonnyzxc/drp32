package router

import (
	"context"
	"github.com/go-chi/chi/v5"
	"net/http"
	"sort"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestRouter_Handler(t *testing.T) {
	// Given:
	r := New(
		context.Background(),
		[]string{},
		false,
		nil,
		nil,
		nil,
		nil,
	)

	expectedRoutes := []string{
		"GET /_/ready",
		"GET /chores/",
		"POST /chore/",
		"POST /family/",
		"POST /user/",
		"PUT /chore/complete/{choreID}/{userID}",
		"PUT /chore/incomplete/{choreID}",
		"DELETE /chore/{choreID}",
		"GET /rtu",
	}
	sort.Strings(expectedRoutes)
	var routesFound []string

	handler, ok := r.Handler().(chi.Router)
	if !ok {
		require.FailNow(t, "handler is not a chi router")
	}

	// When:
	err := chi.Walk(
		handler,
		func(method string, route string, _ http.Handler, _ ...func(http.Handler) http.Handler) error {
			routesFound = append(routesFound, method+" "+route)
			return nil
		},
	)
	require.NoError(t, err)
	sort.Strings(routesFound)

	// Then:
	require.EqualValues(t, expectedRoutes, routesFound)
}
