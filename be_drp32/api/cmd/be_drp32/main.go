package main

import (
	"context"
	"fmt"
	"github.com/sonnyzxc/drp/be_drp32/api/cmd/router"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/handler/realtimeupdates"
	"github.com/sonnyzxc/drp/be_drp32/api/internal/repository"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/app"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/db/pg"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/env"
	"github.com/sonnyzxc/drp/be_drp32/api/pkg/httpserv"
	"log"
	"os"
	"strings"

	"github.com/pkg/errors"
	choreController "github.com/sonnyzxc/drp/be_drp32/api/internal/controller/chore"
	familyController "github.com/sonnyzxc/drp/be_drp32/api/internal/controller/family"
	systemController "github.com/sonnyzxc/drp/be_drp32/api/internal/controller/system"
	userController "github.com/sonnyzxc/drp/be_drp32/api/internal/controller/user"
	"strconv"
)

func main() {
	ctx := context.Background()

	appCfg := app.Config{
		ProjectName:      env.GetAndValidateF("PROJECT_NAME"),
		AppName:          env.GetAndValidateF("APP_NAME"),
		SubComponentName: env.GetAndValidateF("PROJECT_COMPONENT"),
		Env:              app.Env(env.GetAndValidateF("APP_ENV")),
		Version:          env.GetAndValidateF("APP_VERSION"),
		Server:           env.GetAndValidateF("SERVER_NAME"),
		ProjectTeam:      os.Getenv("PROJECT_TEAM"),
	}
	if err := appCfg.IsValid(); err != nil {
		log.Fatal(err)
	}

	if err := run(ctx); err != nil {
		log.Fatal(err)
	}

	log.Println("Exiting...")
}

func run(ctx context.Context) error {
	log.Println("Starting app initialization")

	dbOpenConns, err := strconv.Atoi(env.GetAndValidateF("DB_POOL_MAX_OPEN_CONNS"))
	if err != nil {
		return errors.WithStack(fmt.Errorf("invalid db pool max open conns: %w", err))
	}
	dbIdleConns, err := strconv.Atoi(env.GetAndValidateF("DB_POOL_MAX_IDLE_CONNS"))
	if err != nil {
		return errors.WithStack(fmt.Errorf("invalid db pool max idle conns: %w", err))
	}

	conn, err := pg.NewPool(env.GetAndValidateF("DATABASE_URL"), dbOpenConns, dbIdleConns)

	if err != nil {
		return err
	}

	defer conn.Close()

	rtr, _ := initRouter(ctx, conn)

	log.Println("App initialization completed")

	go realtimeupdates.HandleMessages()

	httpserv.NewServer(rtr.Handler()).Start(ctx)

	return nil
}

func initRouter(
	ctx context.Context,
	dbConn pg.BeginnerExecutor) (router.Router, error) {
	registry := repository.New(dbConn)
	return router.New(
		ctx,
		strings.Split(os.Getenv("CORS_ALLOWED_ORIGINS"), ","),
		os.Getenv("GQL_INTROSPECTION_ENABLED") == "true",
		systemController.New(registry),
		familyController.New(registry),
		userController.New(registry),
		choreController.New(registry),
	), nil
}
