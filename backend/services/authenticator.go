package services

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

type JwtUserClaims struct {
	Email    string `json:"email"`
	Password string `json:"password"`
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
