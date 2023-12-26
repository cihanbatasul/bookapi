package models

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

type AiService interface {
	FetchAIRecommendations(userID, book1, book2, book3 string) ([]string, error)
}

type AiServiceImplementation struct {
	ai AiService
}

const (
	apiEndpoint = "https://api.openai.com/v1/chat/completions"
)

func (ai *AiServiceImplementation) FetchAIRecommendations(userID string, books []string) ([]string, error) {
	apiKey := os.Getenv("OPENAI_KEY")
	prompt := fmt.Sprintf("Given the books '%s',  '%s', and '%s', recommend 10 books similar to them.", books[0], books[1], books[2])
	requestPayload := map[string]interface{}{
		"model":       "gpt-3.5-turbo-instruct",
		"prompt":      prompt,
		"max_tokens":  200,
		"temperature": 0.7,
		"n":           10,
	}

	requestBody, err := json.Marshal(requestPayload)
	if err != nil {
		log.Fatalf("Error while encoding JSON request: %v", err)
	}

	client := &http.Client{}

	request, err := http.NewRequest("POST", apiEndpoint, bytes.NewBuffer(requestBody))
	if err != nil {
		log.Fatalf("Error creating HTTP request: %v", err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+apiKey)

	response, err := client.Do(request)
	if err != nil {
		log.Fatalf("Error while sending request: %v", err)
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatalf("Error while reading response body: %v", err)
	}
	fmt.Printf("OpenAI Response Body: %s\n", body)

	var data map[string]interface{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		fmt.Println("Error while decoding JSON response: ", err)
		return nil, err
	}

	choices, ok := data["choices"].([]interface{})
	if !ok {
		return nil, fmt.Errorf("unexpected response format")
	}

	var bookTitles []string
	for _, choice := range choices {
		text, ok := choice.(map[string]interface{})["text"].(string)
		if ok {
			bookTitles = append(bookTitles, text)
		}
	}

	return bookTitles, nil
}
