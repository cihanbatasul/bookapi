package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
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

	startIndex, err := strconv.Atoi(startIndexStr)
	if err != nil {
		startIndex = 0
	}

	maxResults, err := strconv.Atoi(maxResultsStr)
	if err != nil {
		maxResults = 10
	}

	searchResult, err := app.books.SearchBook(searchQuery, apiKey, startIndex, maxResults)
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
	log.Println(searchResult)
	w.Header().Set("Content-Type", "application/json")
	jsonResult, err := json.Marshal(searchResult)
	if err != nil {
		app.server_error(w, err)
		return
	}
	log.Println(jsonResult)

	_, err = w.Write(jsonResult)
	if err != nil {
		app.server_error(w, err)
	}
}
