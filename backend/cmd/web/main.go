package main

import (
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/cihanbatasul/bookapi/internal/models"
	_ "github.com/cihanbatasul/bookapi/internal/models"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

type application struct {
	error_log *log.Logger
	info_log  *log.Logger
	books     *models.BookServiceImplementation
	users     *models.UserServiceImplementation
	hashes    *models.HashServiceImplementation
}

func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func generateRandomSecret(length int) (string, error) {
	secretBytes := make([]byte, length)
	_, err := rand.Read(secretBytes)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(secretBytes), nil
}

func main() {

	if err := godotenv.Load("../../.env"); err != nil {
		log.Fatalf("Fehler beim Laden der .env-Datei %v", err)
	}

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	addr := flag.String("addr", ":5000", "HTTP network address")
	flag.Parse()

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", os.Getenv("HOST"), os.Getenv("DB_PORT"), os.Getenv("USER_NAME"), os.Getenv("PASSWORD"), os.Getenv("DB_NAME"))

	info_log := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	error_log := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	db, err := openDB(dsn)
	if err != nil {
		fmt.Printf("%s", dsn)
		error_log.Fatal(err)
	}

	defer db.Close()

	app := &application{
		error_log: error_log,
		info_log:  info_log,
		books:     &models.BookServiceImplementation{},
		users:     &models.UserServiceImplementation{DB: db},
		hashes:    &models.HashServiceImplementation{},
	}

	handler := cors.Handler(app.Routes())

	srv := &http.Server{
		Addr:     *addr,
		ErrorLog: app.error_log,
		Handler:  handler,
	}

	info_log.Println("Starting server on port ",
		*addr)

	err = srv.ListenAndServe()
	if err != nil {
		app.error_log.Fatal(err)
	}
}
