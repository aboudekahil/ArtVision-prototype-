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

type UserSign struct {
	Email    string `json:"email" form:"email" validate:"required,email,ascii"`
	Password string `json:"password" form:"password" validate:"required,ascii"`
}

func SignUserUp(c echo.Context) error {
	user := new(UserSign)

	if err := c.Bind(&user); err != nil {
		return c.String(http.StatusBadRequest, "Bad request")
	}

	if err := c.Validate(user); err != nil {
		return err
	}

	id, err := services.AddNewUser(user.Email, user.Password)

	if err != nil {
		log.Println("Error adding user to db", err)
		return c.String(http.StatusInternalServerError, "Something went wrong")
	}

	token, err := services.CreateJwtToken(
		services.JwtUserClaims{
			Id: id,
		},
	)

	if err != nil {
		log.Println("Error creating JWT token", err)
		return c.String(http.StatusInternalServerError, "Something went wrong")
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"token": "Bearer " + token,
		"user": map[string]string{
			"email": user.Email,
		},
	})
}

func SignUserIn(c echo.Context) error {
	user := new(UserSign)

	if err := c.Bind(&user); err != nil {
		return c.String(http.StatusBadRequest, "Bad request")
	}

	id, err := services.AuthenticateUser(user.Email, user.Password)

	if err != nil {
		return c.String(http.StatusUnauthorized, "Unauthorized")
	}

	token, err := services.CreateJwtToken(
		services.JwtUserClaims{
			Id: id,
		},
	)

	if err != nil {
		log.Println("Error creating JWT token", err)
		return c.String(http.StatusInternalServerError, "Something went wrong")
	}

	c.Response().Header().Set("Authorization", "Bearer "+token)

	return c.String(http.StatusOK, "Successful Sign in")
}
