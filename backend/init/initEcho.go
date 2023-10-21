package init

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func InitEcho() *echo.Echo {
	e := echo.New()

	e.Use(middleware.CORS())
	e.Use(middleware.Recover())

	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   os.Getenv("REACT_APP_PATH"),
		Index:  "index.html",
		Browse: false,
		HTML5:  true,
	}))

	return e
}
