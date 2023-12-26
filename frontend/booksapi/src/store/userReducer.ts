import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Shelf,ShelvesResponse } from "@/views/UserProfile";
interface User {
    userID?: string | null  
    isLoggedIn: boolean
    token: string | null
    userName: string 
    shelves: ShelvesResponse
    recommendations: string[]
    authors: string[] 
}

const initialState: User = {
    userID: null, 
    isLoggedIn: false,
    token: null,
    userName: "",
    shelves: {
        userName: "User",
        AllShelves: [
          {
            shelfType: "curr",
            shelf: [
              {
                bookID: "1",
                title: "Current Book",
                author: "Author 1",
                description: "Description of the current book",
                picture: "url-to-book-image",
    
              },
            ],
          },
          {
            shelfType: "fav",
            shelf: [
              {
                bookID: "2",
                title: "Favorite Book",
                author: "Author 2",
                description: "Description of the favorite book",
                picture: "url-to-book-image",
              },
            ],
          },
          {
            shelfType: "wtr",
            shelf: [
              {
                bookID: "3",
                title: "Want to Read Book",
                author: "Author 3",
                description: "Description of the want to read book",
                picture: "url-to-book-image",
              },
            ],
          },
          {
            shelfType: "read",
            shelf: [
              {
                bookID: "4",
                title: "Read Book",
                author: "Author 4",
                description: "Description of the read book",
                picture: "url-to-book-image",
              },
            ],
          },
        ],
      },    
      recommendations: [],
      authors: []  
}

const userSlice = createSlice({
    name: "user", 
    initialState,
    reducers: {
      setAuthors: (state, action: PayloadAction<string[]>) => {
      state.authors = action.payload
    },
      setRecommendations: (state, action:PayloadAction<string[]>) => {
        state.recommendations = action.payload
      },
        setShelves: (state, action: PayloadAction<ShelvesResponse>) => {
            state.shelves = action.payload
        },
        setToken: (state, action: PayloadAction<string>) =>{
            state.token = action.payload
            state.isLoggedIn = !!action.payload
        },
        logoutUser: (state) => {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"        
            state.token = null
            state.isLoggedIn = false 
        },
        setID: (state, action: PayloadAction<string>) => {
            state.userID = action.payload
        }
    }
})

export const {setToken, logoutUser, setID, setShelves, setRecommendations, setAuthors} = userSlice.actions

export default userSlice.reducer
