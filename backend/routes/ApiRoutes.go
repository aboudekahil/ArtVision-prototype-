package routes

import (
	"artvision/backend/controllers"

	"github.com/labstack/echo/v4"
)

func ApiRoutes(apiGroup *echo.Group) {
	apiGroup.POST("/pfp", controllers.ProfilePictureOops)
}
