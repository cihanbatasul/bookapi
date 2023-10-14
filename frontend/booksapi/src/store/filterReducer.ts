import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  maxBooks: number
  ebooks: boolean
  ebookCategory: string | null
}

const initialState: FilterState = {
  maxBooks: 10,
  ebooks: false,
  ebookCategory: "",
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMaxBooks: (state, action: PayloadAction<number>) => {
      state.maxBooks = action.payload
    },
    setEbooks: (state, action: PayloadAction<boolean>) => {
      state.ebooks = action.payload
    },
    setEbookCategory: (state, action: PayloadAction<string | null>) => {
      state.ebookCategory = action.payload
    },
  },
})

export const { setMaxBooks, setEbooks, setEbookCategory } = filterSlice.actions

export default filterSlice.reducer