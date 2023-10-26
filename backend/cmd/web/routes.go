package main

import "net/http"

func (app *application) Routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", app.Home)
	mux.HandleFunc("/search/", app.SearchForBook)
	mux.HandleFunc("/searchbook/", app.RetrieveBookByID)
	mux.HandleFunc("/getimg/", app.ImageGetter)
	mux.HandleFunc("/register", app.Register)
	mux.HandleFunc("/login", app.Login)
	return mux
}
