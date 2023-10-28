package controllers

import (
	"net/http"

	avProfile "artvision/backend/pkg/image"
	"artvision/backend/utils"

	"github.com/labstack/echo/v4"
)

type PfpRequest struct {
	Email string `json:"email"`
}

func ProfilePictureOops(c echo.Context) error {

	var emailReq PfpRequest

	if err := c.Bind(&emailReq); err != nil {
		return utils.Handler.BadRequest(c, err)
	}

	_, err := avProfile.GenerateProfilePictureFromEmail(emailReq.Email)
	if err != nil {
		return utils.Handler.InternalServerError(c, err)
	}
	return c.JSON(http.StatusAccepted, true)
}
