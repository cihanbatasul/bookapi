import { configureStore } from "@reduxjs/toolkit"
import filterReducer from './filterReducer'
import designReducer from "./designReducer"
import userReducer from "./userReducer"


const store = configureStore({
    reducer: {
        filter: filterReducer,
        designer: designReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store