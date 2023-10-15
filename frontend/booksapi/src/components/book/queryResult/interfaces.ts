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
    onClick: (input: string) => void
}


export interface QueryOuter {
    kind: string
    items: Query[]
}


