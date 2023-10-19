package main

import (
	"log"

	"github.com/joho/godotenv"
)

func Init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Some error occured", err)
		panic(err)
	}

}
