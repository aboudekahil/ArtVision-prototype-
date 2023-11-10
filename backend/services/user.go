package services

import "artvision/backend/config"

func CompleteProfileWithImage(email, name, username, bio, img string) error {
	db := config.Db

	var pfp string

	row := db.QueryRow(
		"SELECT user_profile FROM users WHERE user_email = ?",
		email,
	)

	err := row.Scan(&pfp)

	if err != nil {
		return err
	}

	_, err = db.Exec(
		"UPDATE users SET user_name = ?, user_display_name = ?, user_bio = ?, user_profile = ?",
		name,
		username,
		bio,
		img,
	)

	if err != nil {
		return err
	}

	return nil
}

func CompleteProfileNoImage(email, name, username, bio string) error {
	db := config.Db

	var pfp string

	row := db.QueryRow(
		"SELECT user_profile FROM users WHERE user_email = ?",
		email,
	)

	err := row.Scan(&pfp)

	if err != nil {
		return err
	}

	_, err = db.Exec(
		"UPDATE users SET user_name = ?, user_display_name = ?, user_bio = ?",
		name,
		username,
		bio,
	)

	if err != nil {
		return err
	}

	return nil
}
