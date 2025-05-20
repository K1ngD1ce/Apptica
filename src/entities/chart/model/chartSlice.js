import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: null,
    isLoading: false,
    error: null,
}

const chartSlice = createSlice ({
    name: 'chart',
    initialState,
    reducer: {
        fetchChartStart(state) {
            state.isLoading = true;
            state.error = null
        },
        fetchChartSuccess(state, action) {
            state.isLoading = false;
            state.data = action.payload
        },
        fetchChartFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export const {
    fetchChartStart,
    fetchChartSuccess,
    fetchChartFailure,
} = chartSlice.actions

export default chartSlice.reducer