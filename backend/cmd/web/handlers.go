package main

import (
	"encoding/json"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		app.not_found(w)
		return
	}

	// authURL := oauth2Config.AuthCodeURL("", oauth2.AccessTypeOffline)
	//http.Redirect(w, r, authURL, http.StatusFound)
}

func (app *application) SearchForBook(w http.ResponseWriter, r *http.Request) {

	apiKey := os.Getenv("API_KEY")
	searchQuery := r.URL.Query().Get("query")
	startIndexStr := r.URL.Query().Get("startIndex")
	maxResultsStr := r.URL.Query().Get("maxResults")
	inTitle := r.URL.Query().Get("intitle")
	inAuthor := r.URL.Query().Get("inauthor")
	isbn := r.URL.Query().Get("isbn")
	subject := r.URL.Query().Get("subject")
	epub := r.URL.Query().Get("download")
	ebookCost := r.URL.Query().Get("filter")
	orderBy := r.URL.Query().Get("orderby")

	startIndex, err := strconv.Atoi(startIndexStr)
	if err != nil {
		startIndex = 0
	}

	maxResults, err := strconv.Atoi(maxResultsStr)
	if err != nil {
		maxResults = 10
	}

	decodedParams := app.decodeParams(map[string]string{
		"query":     searchQuery,
		"intitle":   inTitle,
		"inauthor":  inAuthor,
		"isbn":      isbn,
		"subject":   subject,
		"ebookCost": ebookCost,
		"epub":      epub,
		"orderby":   orderBy,
	})

	searchResult, err := app.books.SearchBook(
		decodedParams["query"],
		apiKey,
		startIndex,
		maxResults,
		decodedParams["inauthor"],
		decodedParams["intitle"],
		decodedParams["isbn"],
		decodedParams["subject"],
		decodedParams["ebookCost"],
		decodedParams["epub"],
		decodedParams["orderby"],
	)

	if err != nil {
		app.server_error(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	jsonResult, err := json.Marshal(searchResult)
	if err != nil {
		app.server_error(w, err)
		return
	}

	_, err = w.Write(jsonResult)
	if err != nil {
		app.server_error(w, err)
	}
}

func (app *application) RetrieveBookByID(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.Header().Set("Allow", "GET")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	apiKey := os.Getenv("API_KEY")
	bookID := r.URL.Query().Get("id")

	searchResult, err := app.books.RetrieveBook(bookID, apiKey)
	if err != nil {
		app.server_error(w, err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	jsonResult, err := json.Marshal(searchResult)
	if err != nil {
		app.server_error(w, err)
		return
	}

	_, err = w.Write(jsonResult)
	if err != nil {
		app.server_error(w, err)
	}
}

func (app *application) ImageGetter(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.Header().Set("Allow", "GET")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	apiKey := os.Getenv("API_KEY")
	bookID := r.URL.Query().Get("id")

	searchResult, err := app.books.RetrieveBookImages(bookID, apiKey)
	if err != nil {
		app.server_error(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	jsonResult, err := json.Marshal(searchResult)
	if err != nil {
		app.server_error(w, err)
		return
	}

	_, err = w.Write(jsonResult)
	if err != nil {
		app.server_error(w, err)
	}
}

type UserRegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	UserName string `json:"userName"`
}

func (app *application) Register(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.Header().Set("Allow", "POST")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	var reqBody UserRegisterRequest

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&reqBody); err != nil {
		app.server_error(w, err)
		return
	}

	salt, err := app.hashes.GenerateRandomSalt()
	if err != nil {
		app.server_error(w, err)
		return
	}

	hashedPassword, err := app.hashes.HashPassword([]byte(reqBody.Password), []byte(salt))
	if err != nil {
		app.server_error(w, err)
		return
	}

	_, err = app.users.Insert(reqBody.Email, string(hashedPassword), reqBody.UserName)
	if err != nil {
		app.server_error(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)

}

type UserLoginBody struct {
	Email    string `json:"userEmail"`
	Password string `json:"userPassword"`
}

func (app *application) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.Header().Set("Allow", "POST")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	secret := []byte(os.Getenv("JWT_SECRET"))

	var User UserLoginBody
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&User); err != nil {
		app.server_error(w, err)
		return
	}

	userID, err := app.users.Authenticate(User.Email, User.Password)
	if err != nil {
		app.server_error(w, err)
		return
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = userID
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		app.server_error(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	response := map[string]string{"token": tokenString}
	json.NewEncoder(w).Encode(response)
}
