package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	Init()
	router := gin.Default()
	router.Static("/", os.Getenv("REACT_APP_PATH"))

	router.Run(os.Getenv("APP_PORT"))
}
