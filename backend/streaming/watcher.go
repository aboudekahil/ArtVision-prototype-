package streaming

import (
	"time"

	"github.com/gorilla/websocket"
	"github.com/labstack/gommon/log"
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

const (
	writeWait = time.Second * 60
	pongWait  = 60 * time.Second

	pingPeriod = 54 * time.Second

	maxMessageSize = 1024 * 1024 * 10
)

type Watcher struct {
	Conn *websocket.Conn
	Room *Room
	Send chan []byte
}

func NewWatcher(conn *websocket.Conn, room *Room) *Watcher {
	return &Watcher{
		Conn: conn,
		Room: room,
		Send: make(chan []byte, 256),
	}
}

func (client *Watcher) WritePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		if err := client.Conn.Close(); err != nil {
			log.Error(err)
		}
		ticker.Stop()
	}()

	for {
		select {
		case message, ok := <-client.Send:
			client.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				client.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			w, err := client.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			// n := len(client.Send)
			// for i := 0; i < n; i++ {
			// 	w.Write(newline)
			// 	w.Write(<-client.Send)
			// }

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:

			if err := client.Conn.SetWriteDeadline(
				time.Now().Add(writeWait),
			); err != nil {
				return
			}

			if err := client.Conn.WriteMessage(
				websocket.PingMessage,
				nil,
			); err != nil {
				return
			}
		}
	}
}

func (client *Watcher) readPump() {
	defer func() {
		client.Room.Unregister <- client
		client.Conn.Close()
	}()
	client.Conn.SetReadLimit(maxMessageSize)
	client.Conn.SetReadDeadline(time.Now().Add(pongWait))
	client.Conn.SetPongHandler(
		func(string) error {
			client.Conn.SetReadDeadline(time.Now().Add(pongWait))
			return nil
		},
	)

	for {
		_, _, err := client.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(
				err,
				websocket.CloseGoingAway, websocket.CloseAbnormalClosure,
			) {
				log.Printf("error: %v", err)
			}
			break
		}
	}
}
