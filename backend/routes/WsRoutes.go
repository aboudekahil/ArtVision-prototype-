package routes

import (
	"os"
	"strings"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"

	"artvision/backend/controllers"
)

func StreamingRoutes(streamRouter *echo.Group) {

	streamRouter.Use(
		echojwt.WithConfig(
			echojwt.Config{
				SigningKey:    []byte(os.Getenv("JWT_SECRET")),
				SigningMethod: "HS512",
				Skipper: func(c echo.Context) bool {
					return strings.Contains(c.Path(), "/room/")
				},
			},
		),
	)

	streamRouter.POST("/newRoom", controllers.NewRoomController)
	streamRouter.GET("/room/:roomID", controllers.StreamController)
	streamRouter.GET("/room/:roomID/isStreamer", controllers.IsStreamer)
}
