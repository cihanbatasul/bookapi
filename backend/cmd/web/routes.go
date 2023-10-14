package main

import "net/http"

func (app *application) Routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", app.Home)
	mux.HandleFunc("/search", app.SearchForBook)
	mux.HandleFunc("/search/:id", app.RetrieveBookByID)
	return mux
}
