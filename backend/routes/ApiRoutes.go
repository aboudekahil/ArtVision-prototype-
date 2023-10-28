package routes

import (
	"artvision/backend/controllers"
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func ApiRoutes(apiGroup *echo.Group) {
	apiGroup.Use(
		echojwt.WithConfig(
			echojwt.Config{
				SigningKey:    []byte(os.Getenv("JWT_SECRET")),
				SigningMethod: "HS512",
			},
		),
	)

	apiGroup.POST("/pfp", controllers.ProfilePictureOops)
}
