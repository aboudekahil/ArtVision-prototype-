package routes

import (
	"os"
	"strings"

	echojwt "github.com/labstack/echo-jwt/v4"

	"artvision/backend/controllers"

	"github.com/labstack/echo/v4"
)

func ApiRoutes(apiGroup *echo.Group) {
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

	apiGroup.POST("/changeProfile", controllers.ChangeProfileRequest)
}
