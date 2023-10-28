package utils

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type ErrorHandler struct {
}

func (self ErrorHandler) HandleError(c echo.Context, err error, statusCode int, message string) error {
	log.Println(message, err)
	return c.String(statusCode, message)
}

func (self ErrorHandler) BadRequest(c echo.Context, err error) error {
	return self.HandleError(c, err, http.StatusBadRequest, "Bad Request")
}

func (self ErrorHandler) InternalServerError(c echo.Context, err error) error {
	return self.HandleError(c, err, http.StatusInternalServerError, "Something went wrong")
}

var Handler ErrorHandler
