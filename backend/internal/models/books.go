package models

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

type BookService interface {
	SearchBook(query, apiKey string, startIndex, maxResults int, inAuthor, inTitle, imdb, subject, ebookCostCategory, isEpub, orderBy string) (BooksResponse, error)
	RetrieveBook(bookID, apiKey string) (GoogleBooksVolume, error)
	AddBookToShelf(bookID, apiKey, userID, listType string) (bool, error)
	RetrieveBookImages(bookID, apiKey string) (GoogleBookImageLinks, error)
	RetrieveShelves(userID string) (Shelves, error)
	RetrieveLatestBooksAcrossShelves(userID string)
	DeleteBook(bookID, userID string)
	FetchRandomBooks(userID string) ([]string, error)
	GetBooksByAuthor(authorName string, apiKey string, maxResults int) (BooksResponse, error)
	GetAuthors(userID string) (BooksResponse, error)
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

type UserBook struct {
	BookID      string    `json:"bookID"`
	Title       string    `json:"title"`
	Author      string    `json:"author"`
	Description string    `json:"description"`
	Picture     string    `json:"picture"`
	AddedAt     time.Time `json:"added_at"`
}

type Shelf struct {
	ShelfType string     `json:"shelfType"`
	Shelf     []UserBook `json:"shelf"`
}

type Shelves struct {
	UserName   string `json:"userName"`
	AllShelves []Shelf
}

type BookInLibraryResponse struct {
	exists      bool
	libraryName string
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

func (b *BookServiceImplementation) SearchBook(query, apiKey string, startIndex, maxResults int, inAuthor, inTitle, ISBN, subject, ebookCostCategory, isEpub, orderBy string) (BooksResponse, error) {
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
	if ISBN != "" {
		url += fmt.Sprintf("+isbn:%s", ISBN)
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

func (b *BookServiceImplementation) AddBookToShelf(bookID, apiKey, userID, listType string) (bool, error) {
	currentTime := time.Now()
	bookData, err := b.RetrieveBook(bookID, apiKey)
	if err != nil {
		fmt.Println("error at retrievebook")
		return false, err
	}

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", os.Getenv("HOST"), os.Getenv("DB_PORT"), os.Getenv("USER_NAME"), os.Getenv("PASSWORD"), os.Getenv("DB_NAME"))
	db, err := openDB(dsn)
	if err != nil {
		fmt.Println("error at dbopen")

		fmt.Printf("%s", dsn)
		log.Fatal(err)
	}
	defer db.Close()

	values := fmt.Sprintf("BookID: %s \t ListType: %s \t userID: %s", bookData.ID, listType, userID)
	fmt.Println(values)
	var bookExists bool
	err = db.QueryRow("SELECT EXISTS (SELECT 1 FROM Books WHERE book_id = $1)", bookData.ID).Scan(&bookExists)
	if err != nil {
		fmt.Println("Error checking if book exists")
		return false, err
	}

	if !bookExists {
		stmt := `INSERT INTO Books (book_id, title, author, description, picture) VALUES ($1, $2, $3, $4, $5)`
		authorString := strings.Join(bookData.VolumeInfo.Authors, ", ")
		_, err = db.Exec(stmt, bookData.ID, bookData.VolumeInfo.Title, authorString, bookData.VolumeInfo.Description, bookData.VolumeInfo.ImageLinks.Thumbnail)
		if err != nil {
			fmt.Println("error at inserting into books")
			return false, err
		}
	}

	stmt := `INSERT INTO UserBooks(user_id, book_id, list_type, added_at) VALUES ($1, $2, $3, $4)`
	_, err = db.Exec(stmt, userID, bookData.ID, listType, currentTime)
	if err != nil {
		fmt.Println("error at inserting into userbooks")

		return false, err
	}

	return true, nil
}

func (b *BookServiceImplementation) RetrieveShelves(userID string) (Shelves, error) {
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", os.Getenv("HOST"), os.Getenv("DB_PORT"), os.Getenv("USER_NAME"), os.Getenv("PASSWORD"), os.Getenv("DB_NAME"))
	db, err := openDB(dsn)
	if err != nil {
		fmt.Println("error at dbopen")

		fmt.Printf("%s", dsn)
		log.Fatal(err)
	}
	defer db.Close()

	stmt := "SELECT user_name FROM users WHERE user_id = $1"
	var userName string
	err = db.QueryRow(stmt, userID).Scan(&userName)
	if err != nil {
		return Shelves{}, err
	}

	var shelves Shelves
	shelves.UserName = userName

	shelfTypes := []string{"fav", "curr", "read", "wtr"}

	for _, shelfType := range shelfTypes {
		shelf := Shelf{ShelfType: shelfType}
		rows, err := db.Query("SELECT Books.book_id, Books.title, Books.author, Books.description, Books.picture, UserBooks.added_at FROM UserBooks INNER JOIN Books ON UserBooks.book_id = Books.book_id WHERE user_id = $1 AND list_type = $2", userID, shelfType)
		if err != nil {
			fmt.Println("error retrieving shelf")
			return Shelves{}, err
		}

		defer rows.Close()

		for rows.Next() {
			var userBook UserBook
			err := rows.Scan(&userBook.BookID, &userBook.Title, &userBook.Author, &userBook.Description, &userBook.Picture, &userBook.AddedAt)
			if err != nil {
				return Shelves{}, err
			}

			shelf.Shelf = append(shelf.Shelf, userBook)
		}

		shelves.AllShelves = append(shelves.AllShelves, shelf)
	}
	return shelves, nil
}

func (b *BookServiceImplementation) RetrieveLatestBooksAcrossShelves(userID string) ([]UserBook, error) {
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", os.Getenv("HOST"), os.Getenv("DB_PORT"), os.Getenv("USER_NAME"), os.Getenv("PASSWORD"), os.Getenv("DB_NAME"))
	db, err := openDB(dsn)
	if err != nil {
		fmt.Println("error at dbopen")
		fmt.Printf("%s", dsn)
		log.Fatal(err)
	}
	defer db.Close()

	// Query to retrieve the two latest book entries across all shelves
	query := `
        SELECT Books.book_id, Books.title, Books.author, Books.description, Books.picture, UserBooks.added_at
        FROM UserBooks
        INNER JOIN Books ON UserBooks.book_id = Books.book_id
        WHERE user_id = $1
        ORDER BY UserBooks.added_at DESC
        LIMIT 2
    `

	rows, err := db.Query(query, userID)
	if err != nil {
		fmt.Println("error with querying")
		return nil, err
	}
	defer rows.Close()

	var latestBooks []UserBook
	for rows.Next() {
		var userBook UserBook
		if err := rows.Scan(&userBook.BookID, &userBook.Title, &userBook.Author, &userBook.Description, &userBook.Picture, &userBook.AddedAt); err != nil {
			fmt.Println("error with scanning")
			return nil, err
		}
		latestBooks = append(latestBooks, userBook)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("error with rows iteration")
		return nil, err
	}

	return latestBooks, nil
}

func (b *BookServiceImplementation) DeleteBook(bookID, userID string) (bool, error) {
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", os.Getenv("HOST"), os.Getenv("DB_PORT"), os.Getenv("USER_NAME"), os.Getenv("PASSWORD"), os.Getenv("DB_NAME"))
	db, err := openDB(dsn)
	if err != nil {
		fmt.Println("error at dbopen")
		fmt.Printf("%s", dsn)
		log.Fatal(err)
	}
	defer db.Close()

	stmt := `DELETE FROM userbooks WHERE book_id=$1 AND user_id=$2`
	_, err = db.Exec(stmt, bookID, userID)
	if err != nil {
		fmt.Println("Error executing the deletion stmt")
		return false, err
	}

	return true, nil
}

func (b *BookServiceImplementation) FetchRandomBooks(userID string) ([]string, error) {
	var titles []string
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", os.Getenv("HOST"), os.Getenv("DB_PORT"), os.Getenv("USER_NAME"), os.Getenv("PASSWORD"), os.Getenv("DB_NAME"))
	db, err := openDB(dsn)
	if err != nil {
		fmt.Println("error at dbopen")
		fmt.Printf("%s", dsn)
		log.Fatal(err)
	}
	defer db.Close()

	query := `SELECT b.title FROM books b
			  INNER JOIN userbooks ub ON b.book_id = ub.book_id
			  WHERE ub.user_id = $1
			  ORDER BY RANDOM()
			  LIMIT 3`

	rows, err := db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var title string
		if err := rows.Scan(&title); err != nil {
			return nil, err
		}
		titles = append(titles, title)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	fmt.Print(titles)
	return titles, nil
}

func (b *BookServiceImplementation) GetAuthors(userID string) ([]string, error) {
	var authors []string
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", os.Getenv("HOST"), os.Getenv("DB_PORT"), os.Getenv("USER_NAME"), os.Getenv("PASSWORD"), os.Getenv("DB_NAME"))
	db, err := openDB(dsn)
	if err != nil {
		fmt.Println("error at dbopen")
		fmt.Printf("%s", dsn)
		log.Fatal(err)
	}
	defer db.Close()

	query := `SELECT DISTINCT author
	FROM books
	WHERE book_id IN (
		SELECT book_id
		FROM userbooks
		WHERE user_id = $1
	)
	`
	rows, err := db.Query(query, userID)
	if err != nil {
		return authors, err
	}

	defer rows.Close()

	for rows.Next() {
		var author string
		if err := rows.Scan(&author); err != nil {
			fmt.Println("error going through the rows")
			return nil, err
		}
		authors = append(authors, author)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return authors, nil
}
