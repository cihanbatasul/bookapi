export interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    categories: string[];
    ISBN: string; 
  }

export interface Query {
    id: string 
    etag: string
    selfLink: string
    volumeInfo: VolumeInfo
}


export interface QueryOuter {
    kind: string
    items: Query[]
}

interface imageLinks {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  }



export interface VolumeInfoWithImages {
    query: Query
    imageLinks: imageLinks
}
