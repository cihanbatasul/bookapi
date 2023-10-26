package models

import "errors"

var ErrUserAlreadyExists = errors.New("User already exists.")

var ErrNoUserRecord = errors.New("User doesnt exist.")

var ErrPasswordNoMatch = errors.New("Passwords do not match.")
