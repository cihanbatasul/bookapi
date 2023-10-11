package main

import (
	"fmt"
	"net/http"
	"runtime/debug"
)

func (app *application) server_error(w http.ResponseWriter, err error) {
	trace := fmt.Sprintf("%s\n%s", err.Error(), debug.Stack())
	app.error_log.Output(2, trace)

	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
}

func (app *application) client_error(w http.ResponseWriter, status int) {
	http.Error(w, http.StatusText(status), status)
}

func (app *application) not_found(w http.ResponseWriter) {
	app.client_error(w, http.StatusNotFound)
}
