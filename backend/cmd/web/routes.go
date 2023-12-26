package main

import (
	"net/http"
)

func (app *application) Routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", app.Home)
	mux.HandleFunc("/search/", app.SearchForBook)
	mux.HandleFunc("/searchbook/", app.RetrieveBookByID)
	mux.HandleFunc("/getimg/", app.ImageGetter)
	mux.HandleFunc("/register", app.Register)
	mux.HandleFunc("/login", app.Login)
	mux.Handle("/profile/", app.authMiddleware(http.HandlerFunc(app.Profile)))
	mux.Handle("/add/", app.authMiddleware(http.HandlerFunc(app.AddBook)))
	mux.Handle("/logout/", app.authMiddleware(http.HandlerFunc(app.Logout)))
	mux.Handle("/latest/", app.authMiddleware(http.HandlerFunc(app.retrieveLatestBook)))
	mux.Handle("/replace/", app.authMiddleware(http.HandlerFunc(app.SwapShelfs)))
	mux.Handle("/recommendations/", app.authMiddleware(http.HandlerFunc(app.Recommendations)))
	mux.Handle("/authors/", app.authMiddleware(http.HandlerFunc(app.Authors)))
	mux.Handle("/authorbooks/", app.authMiddleware(http.HandlerFunc(app.SearchForBook)))

	return mux
}
