import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    countries: [],
    selectedCountry: null,
}

const selectedCountrySlice = createSlice ({
    name: 'country',
    initialState,
    reducers: {
        setCountries(state, action) {
            state.countries = action.payload
        },
        setSelectedCountry(state, action) {
            state.selectedCountry = action.payload
        }
    }
})

export const { setCountries, setSelectedCountry } = selectedCountrySlice.actions;

export default selectedCountrySlice.reducer