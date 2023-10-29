package main

import (
	"artvision/streaming"
	"fmt"
	"log"
	"net/http"
)

func main() {
	streaming.AllRooms.Init()

	http.HandleFunc("/create", streaming.CreateRoomRequestHandler)
	http.HandleFunc("/join", streaming.JoinRoomRequestHandler)

	log.Println("starting server on port 8081")
	fmt.Println(" ")

	err := http.ListenAndServe(":8081", nil)

	if err != nil {
		log.Fatal((err))
	}
}
