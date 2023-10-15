package models

type GoogleBooksVolume struct {
	Kind       string `json:"kind,omitempty"`
	ID         string `json:"id,omitempty"`
	Etag       string `json:"etag,omitempty"`
	SelfLink   string `json:"selfLink,omitempty"`
	VolumeInfo struct {
		Title               string   `json:"title,omitempty"`
		Subtitle            string   `json:"subtitle,omitempty"`
		Authors             []string `json:"authors,omitempty"`
		Publisher           string   `json:"publisher,omitempty"`
		PublishedDate       string   `json:"publishedDate,omitempty"`
		Description         string   `json:"description,omitempty"`
		IndustryIdentifiers []struct {
			Type       string `json:"type,omitempty"`
			Identifier string `json:"identifier,omitempty"`
		} `json:"industryIdentifiers,omitempty"`
		ReadingModes struct {
			Text  bool `json:"text,omitempty"`
			Image bool `json:"image,omitempty"`
		} `json:"readingModes,omitempty"`
		PageCount        int `json:"pageCount,omitempty"`
		PrintedPageCount int `json:"printedPageCount,omitempty"`
		Dimensions       struct {
			Height    string `json:"height,omitempty"`
			Width     string `json:"width,omitempty"`
			Thickness string `json:"thickness,omitempty"`
		} `json:"dimensions,omitempty"`
		PrintType           string `json:"printType,omitempty"`
		MaturityRating      string `json:"maturityRating,omitempty"`
		AllowAnonLogging    bool   `json:"allowAnonLogging,omitempty"`
		ContentVersion      string `json:"contentVersion,omitempty"`
		PanelizationSummary struct {
			ContainsEpubBubbles  bool `json:"containsEpubBubbles,omitempty"`
			ContainsImageBubbles bool `json:"containsImageBubbles,omitempty"`
		} `json:"panelizationSummary,omitempty"`
		ImageLinks struct {
			SmallThumbnail string `json:"smallThumbnail,omitempty"`
			Thumbnail      string `json:"thumbnail,omitempty"`
			Small          string `json:"small,omitempty"`
			Medium         string `json:"medium,omitempty"`
			Large          string `json:"large,omitempty"`
			ExtraLarge     string `json:"extraLarge,omitempty"`
		} `json:"imageLinks,omitempty"`
		Language            string `json:"language,omitempty"`
		PreviewLink         string `json:"previewLink,omitempty"`
		InfoLink            string `json:"infoLink,omitempty"`
		CanonicalVolumeLink string `json:"canonicalVolumeLink,omitempty"`
	} `json:"volumeInfo,omitempty"`
	SaleInfo struct {
		Country     string `json:"country,omitempty"`
		Saleability string `json:"saleability,omitempty"`
		IsEbook     bool   `json:"isEbook,omitempty"`
	} `json:"saleInfo,omitempty"`
	AccessInfo struct {
		Country                string `json:"country,omitempty"`
		Viewability            string `json:"viewability,omitempty"`
		Embeddable             bool   `json:"embeddable,omitempty"`
		PublicDomain           bool   `json:"publicDomain,omitempty"`
		TextToSpeechPermission string `json:"textToSpeechPermission,omitempty"`
		Epub                   struct {
			IsAvailable bool `json:"isAvailable,omitempty"`
		} `json:"epub,omitempty"`
		Pdf struct {
			IsAvailable bool `json:"isAvailable,omitempty"`
		} `json:"pdf,omitempty"`
		WebReaderLink       string `json:"webReaderLink,omitempty"`
		AccessViewStatus    string `json:"accessViewStatus,omitempty"`
		QuoteSharingAllowed bool   `json:"quoteSharingAllowed,omitempty"`
	} `json:"accessInfo,omitempty"`
}
