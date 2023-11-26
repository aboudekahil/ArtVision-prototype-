package services

import "artvision/backend/config"

func CreateRoom(roomID string, userId float64, name string) error {
	db := config.Db

	_, err := db.Exec(
		"INSERT INTO rooms (room_id, room_name, streamer_id) VALUE (?, ?, ?)",
		roomID,
		name,
		userId,
	)

	return err
}

func DeleteRoom(roomID string) error {
	db := config.Db

	_, err := db.Exec(
		"DELETE FROM rooms WHERE room_id = ?",
		roomID,
	)

	return err
}
