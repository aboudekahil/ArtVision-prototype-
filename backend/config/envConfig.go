package config

import "github.com/joho/godotenv"

func ConfEnv() {
	if err := godotenv.Load(".env"); err != nil {
		panic(err)
	}
}
