package main

import (
	avConfs "artvision/backend/config"
	avInits "artvision/backend/init"
	"artvision/backend/routes"
	"artvision/backend/services"
	"os"

	"github.com/go-playground/validator/v10"
)

func main() {
	avConfs.ConfEnv()
	avConfs.InitDb(os.Getenv("DB_URL"))

	e := avInits.InitEcho()

	e.Validator = &services.CustomValidator{
		Validator: validator.New(validator.WithRequiredStructEnabled()),
	}

	apiGroup := e.Group("/api")

	routes.AuthRoute(apiGroup.Group("/auth"))
	routes.ApiRoutes(apiGroup.Group("/tfy"))

	e.Logger.Fatal(e.Start(os.Getenv("APP_PORT")))
}
