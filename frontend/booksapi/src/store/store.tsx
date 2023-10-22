import { configureStore } from "@reduxjs/toolkit"
import filterReducer from './filterReducer'
import designReducer from "./designReducer"
const store = configureStore({
    reducer: {
        filter: filterReducer,
        designer: designReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store