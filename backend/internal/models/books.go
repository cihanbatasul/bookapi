package models

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type BookService interface {
	SearchForBook(query, apiKey string) ([]BooksResponse, error)
	RetrieveBook(bookID, apiKey string) (GoogleBooksVolume, error)
}

type BookServiceImplementation struct {
	books BookService
}

type BooksResponse struct {
	Kind  string       `json:"kind"`
	Items []BookVolume `json:"items"`
	Total int          `json:"totalItems"`
}

type BookVolume struct {
	Kind       string     `json:"kind"`
	ID         string     `json:"id"`
	ETag       string     `json:"etag"`
	SelfLink   string     `json:"selfLink"`
	VolumeInfo VolumeInfo `json:"volumeInfo"`
}

type VolumeInfo struct {
	Title         string   `json:"title"`
	Authors       []string `json:"authors"`
	Publisher     string   `json:"publisher"`
	PublishedDate string   `json:"publishedDate"`
	Description   string   `json:"description"`
	Categories    []string `json:"categories"`
	ISBN          string   `json:"industryIdentifiers.0.identifier"`
}

func (b *BookServiceImplementation) SearchBook(query, apiKey string, startIndex, maxResults int, inAuthor, inTitle, imdb, subject, ebookCostCategory, isEpub, orderBy string) (BooksResponse, error) {
	url := fmt.Sprintf("https://www.googleapis.com/books/v1/volumes?q=%s", query)

	if ebookCostCategory != "" {
		url += fmt.Sprintf("&filter=%s", ebookCostCategory)
	}

	if inAuthor != "" {
		url += fmt.Sprintf("+inauthor:%s", inAuthor)
	}

	// Append intitle if it's not empty
	if inTitle != "" {
		url += fmt.Sprintf("+intitle:%s", inTitle)
	}

	// Append imdb if it's not empty
	if imdb != "" {
		url += fmt.Sprintf("+imdb:%s", imdb)
	}

	// Append subject if it's not empty
	if subject != "" {
		url += fmt.Sprintf("+subject:%s", subject)
	}

	if isEpub != "" {
		url += fmt.Sprintf("&download=epub")
	}

	if orderBy != "" {
		url += fmt.Sprintf("&orderBy=%s", orderBy)
	}

	url += fmt.Sprintf("&key=%s&startIndex=%d&maxResults=%d", apiKey, startIndex, maxResults)

	response, err := http.Get(url)
	if err != nil {
		return BooksResponse{}, err
	}
	defer response.Body.Close()

	var searchResult BooksResponse

	err = json.NewDecoder(response.Body).Decode(&searchResult)
	if err != nil {
		return BooksResponse{}, err
	}

	return searchResult, nil
}

func (b *BookServiceImplementation) RetrieveBook(bookID string, apiKey string) (GoogleBooksVolume, error) {

	url := fmt.Sprintf("https://www.googleapis.com/books/v1/volumes/%s?key=%s", bookID, apiKey)

	response, err := http.Get(url)

	if err != nil {
		return GoogleBooksVolume{}, err
	}

	defer response.Body.Close()

	var searchResult GoogleBooksVolume
	err = json.NewDecoder(response.Body).Decode(&searchResult)
	if err != nil {
		return GoogleBooksVolume{}, err
	}

	return searchResult, nil

}

func (b *BookServiceImplementation) RetrieveBookImages(bookID, apiKey string) (GoogleBookImageLinks, error) {
	fullVolume, err := b.RetrieveBook(bookID, apiKey)
	if err != nil {
		return GoogleBookImageLinks{}, err
	}

	imageLinks := fullVolume.VolumeInfo.ImageLinks

	bookImageLinks := GoogleBookImageLinks{
		SmallThumbnail: imageLinks.SmallThumbnail,
		Thumbnail:      imageLinks.Thumbnail,
		Small:          imageLinks.Small,
		Medium:         imageLinks.Medium,
		Large:          imageLinks.Large,
		ExtraLarge:     imageLinks.ExtraLarge,
	}

	return bookImageLinks, nil

}
