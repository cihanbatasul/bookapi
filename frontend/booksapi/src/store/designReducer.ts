import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DesignState {
    darkMode: boolean
    openModal: {truth: boolean, modalTitle: string}
    ModalTitle: string
}

const initialState: DesignState = {
    darkMode: true,
    openModal: {truth: false, modalTitle: ""},
    ModalTitle: ""
}

const designSlice = createSlice({
    name: "design",
    initialState: initialState,
    reducers: {
        setDesignMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload
        },
        setOpenModal: (state, action:PayloadAction<{truth: boolean, modalTitle: string}>) => {
            state.openModal = action.payload
            state.ModalTitle = action.payload.modalTitle
        }
    }
})

export const {setDesignMode, setOpenModal} = designSlice.actions

export default designSlice.reducer