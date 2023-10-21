package routes

import (
	"artvision/backend/controllers"

	"github.com/labstack/echo/v4"
)

func AuthRoute(authGroup *echo.Group) {
	authGroup.POST("/signup", controllers.SignUserUp)
}
