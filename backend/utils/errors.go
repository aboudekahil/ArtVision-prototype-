package utils

import (
	"log"

	"github.com/labstack/echo/v4"
)

func HandleError(c echo.Context, err error, statusCode int, message string) error {
	log.Println(message, err)
	return c.String(statusCode, message)
}
