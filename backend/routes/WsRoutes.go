package routes

import (
	"os"
	"strings"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"

	"artvision/backend/controllers"
)

func WsRoutes(wsRouter *echo.Group) {

	wsRouter.Use(
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

	wsRouter.POST("/newRoom", controllers.NewRoomController)
	wsRouter.GET("/room/:roomID", controllers.StreamController)
	wsRouter.GET("/room/:roomID/isStreamer", controllers.IsStreamer)
}
