package controllers

import (
	avProfile "artvision/backend/pkg/image"
	"artvision/backend/services"
	"artvision/backend/utils"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type UserSign struct {
	Email    string `json:"email" form:"email" validate:"required,email,ascii"`
	Password string `json:"password" form:"password" validate:"required,ascii"`
}

type UserResponse struct {
	Email        string `json:"email"`
	ProfileImage string `json:"profile_image"`
}

type SignUserResponse struct {
	Token string       `json:"token"`
	User  UserResponse `json:"user"`
}

func SignUserUp(c echo.Context) error {
	user := new(UserSign)

	if err := c.Bind(&user); err != nil {
		return utils.Handler.BadRequest(c, err)
	}

	if err := c.Validate(user); err != nil {
		return utils.Handler.BadRequest(c, err)
	}

	imagePath, err := avProfile.GenerateProfilePictureFromEmail(user.Email)
	if err != nil {
		return utils.Handler.InternalServerError(c, err)
	}

	id, err := services.AddNewUser(user.Email, user.Password, string(imagePath))
	if err != nil {
		return utils.Handler.InternalServerError(c, err)
	}

	token, err := services.CreateJwtToken(
		services.JwtUserClaims{
			Id: id,
		},
	)
	if err != nil {
		return utils.Handler.InternalServerError(c, err)
	}

	return c.JSON(http.StatusCreated, SignUserResponse{
		Token: "Bearer " + token,
		User: UserResponse{
			Email:        user.Email,
			ProfileImage: string(imagePath),
		},
	})
}

func SignUserIn(c echo.Context) error {
	user := new(UserSign)

	if err := c.Bind(&user); err != nil {
		return c.String(http.StatusBadRequest, "Bad request")
	}

	id, profileImage, err := services.AuthenticateUser(user.Email,
		user.Password)

	if err != nil {
		return utils.Handler.HandleError(c, err, http.StatusUnauthorized, "Unauthorized")
	}

	token, err := services.CreateJwtToken(
		services.JwtUserClaims{
			Id: id,
		},
	)

	if err != nil {
		log.Println("Error creating JWT token", err)
		return utils.Handler.InternalServerError(c, err)
	}

	c.Response().Header().Set("Authorization", "Bearer "+token)

	return c.JSON(http.StatusOK, SignUserResponse{
		Token: token,
		User: UserResponse{
			Email:        user.Email,
			ProfileImage: profileImage,
		},
	})
}
