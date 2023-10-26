package models

import (
	"database/sql"
	"strconv"

	"golang.org/x/crypto/bcrypt"
)

type UserServiceImplementation struct {
	*sql.DB
}

func (db *UserServiceImplementation) VerifyExistence(email string) error {
	stmt := "SELECT user_id FROM users WHERE LOWER(user_email)=LOWER($1)"
	var doesUserExist int
	err := db.DB.QueryRow(stmt, email).Scan(&doesUserExist)
	return err
}

func (db *UserServiceImplementation) Insert(email, name, password string) (bool, error) {

	err := db.VerifyExistence(email)
	if err == nil {
		return false, ErrUserAlreadyExists
	} else if err != sql.ErrNoRows {
		return false, err
	}
	stmt := "INSERT INTO users (user_email, user_name, user_password) VALUES ($1, $2, $3)"

	_, err = db.DB.Exec(stmt, email, name, password)
	if err != nil {
		return false, err
	}

	return true, nil
}

func (db *UserServiceImplementation) Authenticate(email, password string) (int, error) {
	stmt := "SELECT user_email, user_password, user_id FROM users WHERE LOWER(user_email)=LOWER($1)"
	var hashedPassword string
	var userEmail string
	var userID string

	err := db.DB.QueryRow(stmt, email).Scan(&hashedPassword, &userEmail, &userID)
	if err == sql.ErrNoRows {
		return 0, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return 0, err
	}

	i, err := strconv.Atoi(userID)
	if err != nil {
		return 0, err
	}

	return i, nil
}
