package controllers

import (
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"

	"artvision/backend/services"
	"artvision/backend/streaming"
	"artvision/backend/utils"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

func NewRoomController(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)

	email := claims["email"].(string)

	roomID := uuid.New().String()
	room := streaming.NewRoom(roomID, nil)

	streamer := streaming.NewStreamer(room, email)

	room.Streamer = streamer

	streaming.Rooms[roomID] = room

	if err := services.CreateRoom(
		roomID,
		claims["id"].(float64),
		"",
	); err != nil {
		return utils.Handler.InternalServerError(c, err)
	}

	return c.String(http.StatusOK, roomID)
}

func StreamController(c echo.Context) error {
	roomID := c.Param("roomID")
	room, ok := streaming.Rooms[roomID]

	if !ok {
		return c.String(http.StatusNotFound, "Room does not exist")
	}

	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)

	if err != nil {
		c.Logger().Error(err)
		return err
	}

	token := c.QueryParam("user")

	if token == "" {
		client := streaming.NewWatcher(ws, room)
		room.Register <- client

		go client.WritePump()

		return c.String(http.StatusOK, "Watched")
	}

	token = strings.Split(token, "Bearer ")[1]
	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(
		token, claims,
		func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		},
	)

	if err != nil {
		return c.String(http.StatusUnauthorized, "Invalid JWT Token")
	}

	email := claims["email"].(string)

	if room.Streamer.UserEmail != email {
		client := streaming.NewWatcher(ws, room)
		room.Register <- client

		go client.WritePump()

		return c.String(http.StatusOK, "Watched")
	}

	if err != nil {
		c.Logger().Error(err)
		return err
	}

	room.Streamer.Conn = ws

	go room.Run()
	go room.Streamer.ReadPump()

	return c.String(http.StatusOK, "steamed")
}

func IsStreamer(c echo.Context) error {
	roomID := c.Param("roomID")
	room, ok := streaming.Rooms[roomID]

	if !ok {
		return c.String(http.StatusNotFound, "Room does not exist")
	}

	token := c.Request().Header.Get("Authorization")

	if token == "" {
		return c.JSON(http.StatusOK, false)
	}

	token = strings.Split(token, "Bearer ")[1]
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(
		token, claims,
		func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		},
	)

	if err != nil {
		return c.String(http.StatusUnauthorized, "Invalid JWT Token")
	}

	email := claims["email"].(string)

	if room.Streamer.UserEmail != email {
		return c.JSON(http.StatusOK, false)
	}

	return c.JSON(http.StatusOK, true)
}
