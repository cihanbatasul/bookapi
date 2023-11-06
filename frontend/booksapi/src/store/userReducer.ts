import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    userID?: string | null  
    isLoggedIn: boolean
    token: string | null
    userName: string 
}

const initialState: User = {
    userID: null, 
    isLoggedIn: false,
    token: null,
    userName: "",      
}

const userSlice = createSlice({
    name: "user", 
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) =>{
            state.token = action.payload
            state.isLoggedIn = !!action.payload
        },
        logoutUser: (state) => {
            state.token = null
            state.isLoggedIn = false 
        },
        setID: (state, action: PayloadAction<string>) => {
            state.userID = action.payload
        }
    }
})

export const {setToken, logoutUser, setID} = userSlice.actions

export default userSlice.reducer