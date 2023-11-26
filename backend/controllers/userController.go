package controllers

import (
	"io"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"

	"artvision/backend/services"

	"artvision/backend/utils"

	"github.com/labstack/echo/v4"
)

type PfpRequest struct {
	Email string `json:"email"`
}

type CompleteProfileRequest struct {
	Name     string
	Username string
	Bio      string
}

func ChangeProfileRequest(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)

	email := claims["email"].(string)

	name := c.FormValue("name")
	username := c.FormValue("username")
	bio := c.FormValue("bio")

	name = strings.TrimSpace(name)
	err := services.Validator.Var(name, "ascii,max=255")
	if err != nil {
		return utils.Handler.HandleError(
			c, err, http.StatusBadRequest,
			"Bad name format",
		)
	}

	username = strings.TrimSpace(username)
	err = services.Validator.Var(username, "ascii,max=255")
	if err != nil {
		return utils.Handler.HandleError(
			c, err, http.StatusBadRequest,
			"Bad username format",
		)
	}

	bio = strings.TrimSpace(bio)
	err = services.Validator.Var(bio, "max=300")
	if err != nil {
		return utils.Handler.HandleError(
			c, err, http.StatusBadRequest,
			"Bad bio format",
		)
	}

	file, err := c.FormFile("avatar")

	if err != nil {
		err = services.CompleteProfileNoImage(
			email,
			name,
			username,
			bio,
		)

		if err != nil {
			return utils.Handler.BadRequest(c, err)
		}

		return c.JSON(
			http.StatusAccepted, map[string]string{
				"name":     name,
				"username": username,
				"bio":      bio,
			},
		)
	}

	src, err := file.Open()
	if err != nil {
		return utils.Handler.InternalServerError(c, err)
	}
	defer src.Close()

	fileName := uuid.NewString() + file.Filename

	dst, err := os.Create(
		path.Join(
			".",
			"web",
			"static",
			"pfpimages",
			fileName,
		),
	)
	if err != nil {
		return utils.Handler.InternalServerError(c, err)
	}
	defer dst.Close()

	if _, err = io.Copy(dst, src); err != nil {
		return err
	}

	err = services.CompleteProfileWithImage(
		email,
		name,
		username,
		bio,
		"pfpimages\\"+fileName,
	)
	if err != nil {
		return utils.Handler.BadRequest(c, err)
	}

	return c.JSON(
		http.StatusAccepted, map[string]string{
			"name":          name,
			"username":      username,
			"bio":           bio,
			"profile_image": "pfpimages\\" + fileName,
		},
	)
}
