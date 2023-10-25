package services

import (
	"artvision/backend/config"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

type JwtUserClaims struct {
	Id int64 `json:"id"`
}

type JwtClaims struct {
	JwtUserClaims
	jwt.StandardClaims
}

func CreateJwtToken(userClaims JwtUserClaims) (string, error) {
	claims := JwtClaims{
		userClaims,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(20 * time.Second).Unix(),
		},
	}

	rawToken := jwt.NewWithClaims(jwt.SigningMethodHS512, claims)

	token, err := rawToken.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		return "", err
	}

	return token, nil
}

func AuthenticateUser(email, password string) (int64, error) {
	db := config.Db

	row := db.QueryRow(
		"SELECT user_id FROM users WHERE user_email = ? AND user_password = ?",
		email,
		password,
	)

	var id int64

	err := row.Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

func AddNewUser(email, password string) (int64, error) {
	db := config.Db

	res, err := db.Exec(
		"INSERT INTO users (user_email, user_password) VALUE (?, ?)",
		email,
		password,
	)

	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()

	if err != nil {
		return 0, err
	}

	return id, nil
}
