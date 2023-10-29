package main

import (
	avConfs "artvision/backend/config"
	avInits "artvision/backend/init"
	"artvision/backend/routes"
	"artvision/backend/services"
	"os"
	"strings"

	"github.com/go-playground/validator/v10"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	avConfs.ConfEnv()
	avConfs.InitDb(os.Getenv("DB_URL"))

	e := avInits.InitEcho()

	e.Validator = &services.CustomValidator{
		Validator: validator.New(validator.WithRequiredStructEnabled()),
	}

	e.Use(middleware.CORS())

	apiGroup := e.Group("/api")

	apiGroup.Use(
		echojwt.WithConfig(
			echojwt.Config{
				SigningKey:    []byte(os.Getenv("JWT_SECRET")),
				SigningMethod: "HS512",
				Skipper: func(c echo.Context) bool {
					return strings.Contains(c.Path(), "/auth/")
				},
			},
		),
	)

	routes.AuthRoute(apiGroup.Group("/auth"))
	routes.ApiRoutes(apiGroup)

	e.Logger.Fatal(e.Start(os.Getenv("APP_PORT")))
}
