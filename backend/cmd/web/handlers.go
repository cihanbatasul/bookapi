package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
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
	// http.Redirect(w, r, authURL, http.StatusFound)
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

	hashedPassword, err := app.user_helpers.HashPassword([]byte(reqBody.Password))
	if err != nil {
		app.server_error(w, err)
		return
	}

	_, err = app.users.Insert(reqBody.Email, reqBody.UserName, hashedPassword)
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
	fmt.Println("User ID:", userID)
	tokenString, err := app.user_helpers.GenerateToken(userID)
	if err != nil {
		println(userID, tokenString)
		app.server_error(w, err)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		MaxAge:   3600,
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	})

	w.WriteHeader(http.StatusOK)
}

func (app *application) authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Check for a valid JWT token and extract user information.
		cookie, err := r.Cookie("token")
		if err != nil || cookie.Value == "" {
			println("r.cookie empty or not nil")
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		tokenString := cookie.Value
		secretKey := []byte(os.Getenv("JWT_SECRET"))
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return secretKey, nil
		})

		if err != nil || !token.Valid {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		userID, found := claims["user_id"].(string)
		if !found {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		r = r.WithContext(context.WithValue(r.Context(), "userID", userID))

		next.ServeHTTP(w, r)
	})
}

func (app *application) Logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		MaxAge:   -1,
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Unix(0, 0),
	})

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Add your frontend URL
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.WriteHeader(http.StatusOK)
}

func (app *application) Profile(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.Header().Set("Allow", "Get")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	userID := r.Context().Value("userID").(string)

	shelves, err := app.books.RetrieveShelves(userID)
	if err != nil {
		app.server_error(w, err)
		return
	}

	jsonShelves, err := json.Marshal(shelves)
	if err != nil {
		app.server_error(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonShelves)
}

func (app *application) AddBook(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.Header().Set("Allow", "POST")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	println("addbook")
	apiKey := os.Getenv("API_KEY")
	userID, ok := r.Context().Value("userID").(string)
	if !ok {
		println("id error")

		app.server_error(w, errors.New("failed extraction of userID during authentication"))
		return
	}
	var requestBody struct {
		BookID string `json:"bookID"`
		Shelf  string `json:"shelf"`
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&requestBody); err != nil {
		app.server_error(w, err)
		return
	}

	_, err := app.books.AddBookToShelf(requestBody.BookID, apiKey, userID, requestBody.Shelf)
	if err != nil {
		app.server_error(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (app *application) retrieveLatestBook(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		fmt.Println("seee")
		w.Header().Add("Allow", "GET")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value("userID").(string)

	latestBook, err := app.books.RetrieveLatestBooksAcrossShelves(userID)
	if err != nil {
		fmt.Println("error with model function")
		app.server_error(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	jsonResult, err := json.Marshal(latestBook)
	if err != nil {
		fmt.Println("error with marshaling into json")
		app.server_error(w, err)
		return
	}
	_, err = w.Write(jsonResult)
	if err != nil {
		fmt.Println("error with writing json to responsewriter")

		app.server_error(w, err)
	}
}

func (app *application) SwapShelfs(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.Header().Add("Allow", "POST")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value("userID").(string)
	apiKey := os.Getenv("API_KEY")
	type Swap struct {
		BookID string `json:"bookID"`
		Shelf  string `json:"shelf"`
	}

	decoder := json.NewDecoder(r.Body)
	var requestBody Swap
	if err := decoder.Decode(&requestBody); err != nil {
		app.server_error(w, err)
		return
	}

	_, err := app.books.DeleteBook(requestBody.BookID, userID)
	if err != nil {
		app.server_error(w, err)
		return
	}

	_, err = app.books.AddBookToShelf(requestBody.BookID, apiKey, userID, requestBody.Shelf)
	if err != nil {
		app.server_error(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (app *application) Recommendations(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.Header().Add("Allow", "GET")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value("userID").(string)

	titles, err := app.books.FetchRandomBooks(userID)
	if err != nil {
		fmt.Println("Couldnt fetch Random Books out of DB")
		app.server_error(w, err)
		return
	}

	recommendations, err := app.ai.FetchAIRecommendations(userID, titles)
	if err != nil {
		fmt.Println("couldnt fetch ai recommendations")
		app.server_error(w, err)
		return
	}

	jsonRecommendations, err := json.Marshal(recommendations)
	if err != nil {
		app.server_error(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonRecommendations)
}

func (app *application) Authors(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.Header().Add("Allow", "GET")
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	userID := r.Context().Value("userID").(string)

	authors, err := app.books.GetAuthors(userID)
	if err != nil {
		fmt.Println("Error fetching authors from DB")
		app.server_error(w, err)
		return
	}

	jsonAuthors, err := json.Marshal(authors)
	if err != nil {
		fmt.Println("Error marshaling authors into json format")
		app.server_error(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonAuthors)
}
