import { configureStore } from "@reduxjs/toolkit"
import chartReducer from '../../entities/chart/model/chartSlice.js'
import countryReducer from '../../features/headerPanel/model/selectedCountrySlice.js'
import categoryReducer from '../../entities/category/model/categorySlice.js'

export const store = configureStore({
    reducer: {
        chart: chartReducer,
        country: countryReducer,
        categories: categoryReducer,
    }
})