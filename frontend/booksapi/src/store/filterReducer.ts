import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  query: string
  maxBooks: number
  epubs: boolean
  epubCategory: string | null
  ISBN:    string | null
  inTitle: string | null
  inAuthor: string | null 
  subject: string | null
  orderBy: string | null 
}

const initialState: FilterState = {
  query: "",
  maxBooks: 10,
  epubs: false,
  epubCategory: "",
  ISBN: "",
  inTitle: "", 
  inAuthor: "",
  subject: "",
  orderBy: "",
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers:{
    setQuery: (state, action: PayloadAction<string>) => {
    state.query = action.payload
     },
    setMaxBooks: (state, action: PayloadAction<number>) => {
      state.maxBooks = action.payload
    },
    setEpubs: (state, action: PayloadAction<boolean>) => {
      state.epubs = action.payload
    },
    setEpubCategory: (state, action: PayloadAction<string | null>) => {
      state.epubCategory = action.payload
    },
    setEbookISBN:  (state, action: PayloadAction<string  | null>) => {
      state.ISBN = action.payload
    },
    setEbookInTitle:  (state, action: PayloadAction<string  | null>) => {
      state.inTitle = action.payload
    },
    setEbookInAuthor:  (state, action: PayloadAction<string  | null>) => {
      state.inAuthor = action.payload
    },
    setEbookSubject:  (state, action: PayloadAction<string  | null>) => {
      state.subject = action.payload
    },
    setOrderBy: (state, action: PayloadAction<string | null>) => {
      state.orderBy = action.payload
    }
  },
})

export const {setQuery, setMaxBooks, setEpubs, setEpubCategory, setEbookISBN, setEbookInAuthor, setEbookInTitle, setEbookSubject, setOrderBy} = filterSlice.actions

export default filterSlice.reducer