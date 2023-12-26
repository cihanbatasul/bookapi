import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DesignState {
    openModal: {truth: boolean, modalTitle: string}
    ModalTitle: string,
    inViewFeature: string | null 
    reload: boolean | null 
}

const initialState: DesignState = {
    openModal: {truth: false, modalTitle: ""},
    ModalTitle: "",
    inViewFeature: null,
    reload: null 
}

const designSlice = createSlice({
    name: "design",
    initialState: initialState,
    reducers: {
        setReload: (state, action: PayloadAction<boolean | null>) => {
            state.reload = action.payload
        },
        setInViewFeature: (state, action: PayloadAction< string | null>) => {
            state.inViewFeature = action.payload
        },
        setOpenModal: (state, action:PayloadAction<{truth: boolean, modalTitle: string}>) => {
            state.openModal = action.payload
            state.ModalTitle = action.payload.modalTitle
        }
    }
})

export const {setOpenModal, setInViewFeature, setReload} = designSlice.actions

export default designSlice.reducer