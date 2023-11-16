package streaming

type Room struct {
	Clients    map[*Watcher]bool
	Broadcast  chan []byte
	Register   chan *Watcher
	Unregister chan *Watcher
	Streamer   *Streamer
	RoomID     string
}

func NewRoom(id string, streamer *Streamer) *Room {
	return &Room{
		Broadcast:  make(chan []byte),
		Register:   make(chan *Watcher),
		Unregister: make(chan *Watcher),
		Clients:    make(map[*Watcher]bool),
		RoomID:     id,
		Streamer:   streamer,
	}
}

func (room Room) Run() {
	for {
		select {
		case client := <-room.Register:
			room.Clients[client] = true
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
		}
	}
}
