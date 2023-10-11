package main

import (
	"encoding/json"
	"net/http"
	"os"
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

	searchResult, err := app.books.SearchBook("kabale", apiKey)
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
