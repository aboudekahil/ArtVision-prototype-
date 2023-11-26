package main

import (
	"log"
	"os"

	avConfs "artvision/backend/config"
	"artvision/backend/routes"
	"artvision/backend/services"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	avConfs.ConfEnv()
	err := avConfs.InitDb(os.Getenv("DB_URL"))

	if err != nil {
		log.Fatal("Error init echo")
		return
	}

	e := avConfs.InitEcho()

	e.Validator = &services.CustomValidator{
		Validator: validator.New(validator.WithRequiredStructEnabled()),
	}

	e.Use(middleware.CORS())

	apiGroup := e.Group("/api")

	routes.AuthRoute(apiGroup.Group("/auth"))
	routes.ApiRoutes(apiGroup)
	routes.StreamingRoutes(e.Group("/streaming"))
	// e.GET("/ws", controllers.WsController)
	e.Logger.Fatal(e.Start(os.Getenv("APP_PORT")))
}
