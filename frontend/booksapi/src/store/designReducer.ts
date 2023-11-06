import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DesignState {
    openModal: {truth: boolean, modalTitle: string}
    ModalTitle: string
}

const initialState: DesignState = {
    openModal: {truth: false, modalTitle: ""},
    ModalTitle: ""
}

const designSlice = createSlice({
    name: "design",
    initialState: initialState,
    reducers: {
      
        setOpenModal: (state, action:PayloadAction<{truth: boolean, modalTitle: string}>) => {
            state.openModal = action.payload
            state.ModalTitle = action.payload.modalTitle
        }
    }
})

export const {setOpenModal} = designSlice.actions

export default designSlice.reducer