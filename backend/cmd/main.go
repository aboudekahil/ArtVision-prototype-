package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"

	"artvision/backend/config"
)

func main() {
	config.ConfEnv()
	err := config.InitDb(os.Getenv("DB_URL"))
	if err != nil {
		log.Fatal("Error init database")
		return
	}

	router := mux.NewRouter()

	log.Println("Listening on http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", router))
}
