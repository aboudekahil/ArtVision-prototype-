package routes

import (
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
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

	apiGroup.GET("/gay", func(c echo.Context) error {
		token := c.Get("user").(*jwt.Token)

		return c.JSON(http.StatusAccepted, token)
	})

}
