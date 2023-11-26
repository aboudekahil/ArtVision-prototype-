package streaming

import (
	"bytes"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

type Streamer struct {
	Conn      *websocket.Conn
	Room      *Room
	UserEmail string
}

func NewStreamer(room *Room, email string) *Streamer {
	return &Streamer{
		Conn:      nil,
		Room:      room,
		UserEmail: email,
	}
}

func (streamer Streamer) ReadPump() {
	defer func() {
		streamer.Conn.Close()
	}()
	streamer.Conn.SetReadLimit(maxMessageSize)
	streamer.Conn.SetReadDeadline(time.Now().Add(pongWait))
	streamer.Conn.SetPongHandler(
		func(string) error {
			streamer.Conn.SetReadDeadline(time.Now().Add(pongWait))
			return nil
		},
	)

	for {
		_, message, err := streamer.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(
				err,
				websocket.CloseGoingAway,
				websocket.CloseAbnormalClosure,
			) {
				log.Printf("error: %v", err)
			}
			streamer.Room.EndStream <- true

			break
		}
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		streamer.Room.Broadcast <- message
	}
}
