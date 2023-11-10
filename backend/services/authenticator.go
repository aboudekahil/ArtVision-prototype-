package services

import (
	"os"
	"time"

	"artvision/backend/config"

	"github.com/golang-jwt/jwt"
)

type JwtUserClaims struct {
	Id       int64  `json:"id"`
	Email    string `json:"email"`
	Name     string `json:"name,omitempty"`
	Username string `json:"username,omitempty"`
	Bio      string `json:"bio,omitempty"`
}

type JwtClaims struct {
	JwtUserClaims
	jwt.StandardClaims
}

func CreateJwtToken(userClaims JwtUserClaims) (string, error) {
	claims := JwtClaims{
		userClaims,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * 31 * 12 * time.Hour).Unix(),
		},
	}

	rawToken := jwt.NewWithClaims(jwt.SigningMethodHS512, claims)

	token, err := rawToken.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		return "", err
	}

	return token, nil
}

func AuthenticateUser(email, password string) (
	id int64,
	profileImage string,
	err error,
) {
	db := config.Db

	row := db.QueryRow(
		"SELECT user_id, user_profile FROM users WHERE user_email = ? AND user_password = ?",
		email,
		password,
	)

	err = row.Scan(&id, &profileImage)

	if err != nil {
		return 0, "", err
	}

	return id, profileImage, nil
}

func AddNewUser(email, password, imagePath string) (int64, error) {
	db := config.Db

	res, err := db.Exec(
		"INSERT INTO users (user_email, user_password, user_profile) VALUE (?, ?, ?)",
		email,
		password,
		imagePath,
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
