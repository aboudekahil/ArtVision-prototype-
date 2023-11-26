package streaming

import (
	"log"

	"artvision/backend/services"
)

type Room struct {
	Clients    map[*Watcher]bool
	Broadcast  chan []byte
	Register   chan *Watcher
	Unregister chan *Watcher
	Streamer   *Streamer
	RoomID     string
	History    [][]byte
	EndStream  chan bool
}

var Rooms = make(map[string]*Room)

func NewRoom(id string, streamer *Streamer) *Room {
	return &Room{
		Broadcast:  make(chan []byte),
		Register:   make(chan *Watcher),
		Unregister: make(chan *Watcher),
		Clients:    make(map[*Watcher]bool),
		RoomID:     id,
		Streamer:   streamer,
		History:    make([][]byte, 0, 5),
	}
}

func (room Room) Run() {
	defer func() {
		delete(Rooms, room.RoomID)
		err := services.DeleteRoom(room.RoomID)
		if err != nil {
			log.Fatal(err)
			return
		}
	}()
loop:
	for {
		select {
		case client := <-room.Register:
			room.Clients[client] = true
			for _, action := range room.History {
				client.Send <- action
			}
		case client := <-room.Unregister:
			if _, ok := room.Clients[client]; ok {
				delete(room.Clients, client)
				close(client.Send)
			}
		case message := <-room.Broadcast:
			for client := range room.Clients {
				select {
				case client.Send <- message:
				default:
					close(client.Send)
					delete(room.Clients, client)
				}
			}
			room.History = append(room.History, message)

		case end := <-room.EndStream:
			if end {
				break loop
			}
		}
	}
}
