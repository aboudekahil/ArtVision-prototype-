package controllers

import (
	"artvision/backend/services"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type User struct {
	Name        string `json:"name" form:"name" validate:"required,ascii"`
	Email       string `json:"email" form:"email" validate:"required,email,ascii"`
	DisplayName string `json:"displayName" form:"displayName" validate:"required,ascii"`
	Password    string `json:"password" form:"password" validate:"required,ascii"`
	Bio         string `json:"bio" form:"bio" validate:"required,ascii"`
}

type UserSignUp struct {
	Email    string `json:"email" form:"email" validate:"required,email,ascii"`
	Password string `json:"password" form:"password" validate:"required,ascii"`
}

func SignUserUp(c echo.Context) error {
	user := new(UserSignUp)

	if err := c.Bind(&user); err != nil {
		return c.String(http.StatusBadRequest, "Bad requests")
	}

	if err := c.Validate(user); err != nil {
		return err
	}

	token, err := services.CreateJwtToken(
		services.JwtUserClaims{
			Email:    user.Email,
			Password: user.Password,
		})

	if err != nil {
		log.Println("Error creating JWT token", err)
		return c.String(http.StatusInternalServerError, "Something went wrong")
	}

	c.Response().Header().Set("Token", token)

	return c.JSON(http.StatusCreated, map[string]string{
		"message": "Successful signup",
	})
}
