import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryGroups: [],
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategoryGroups(state, action) {
            state.categoryGroups = action.payload
        },
    },
})

export const {setCategoryGroups} = categorySlice.actions
export default categorySlice.reducer