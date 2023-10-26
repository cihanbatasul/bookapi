package models

import (
	"crypto/rand"
	"encoding/hex"

	"golang.org/x/crypto/bcrypt"
)

type HashService interface {
	GenerateRandomSalt() (string, error)
	HashPassword(password []byte, salt []byte) ([]byte, error)
}

type HashServiceImplementation struct {
	Hashes HashService
}

func (h *HashServiceImplementation) GenerateRandomSalt() (string, error) {
	salt := make([]byte, 32) // Generate a 32-byte salt
	_, err := rand.Read(salt)
	if err != nil {
		return "", err
	}
	return hex.EncodeToString(salt), nil
}

func (h *HashServiceImplementation) HashPassword(password []byte, salt []byte) ([]byte, error) {
	passwordWithSalt := append(password, salt...)
	hash, err := bcrypt.GenerateFromPassword(passwordWithSalt, bcrypt.DefaultCost)
	return hash, err
}
