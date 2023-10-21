package config

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB

func InitDb(url string) error {
	db, err := sql.Open("mysql", url)

	if err != nil {
		panic(err)
	}

	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	Db = db

	fmt.Println("Connected to database")

	return nil
}
