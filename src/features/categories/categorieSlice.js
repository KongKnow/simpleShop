import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import axios from 'axios'

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/categories`)
            return res.data
        } catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const fetchProductsById = createAsyncThunk(
    'categories/fetchProductsById',
    async (payload, thunkAPI) => {
        console.log(payload)
        try {
            const res = await axios(`${BASE_URL}/products/?categoryId=${payload.id}&price_min=${payload.price_min}&price_max=${payload.price_max}&offset=${payload.offset}&limit=10`)
            return res.data
        } catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const initialState ={
    categories: [],
    productsByCategory: [],
    loading: false,
    error: false
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, {payload}) => {
                state.categories = payload
            })
            .addCase(fetchProductsById.fulfilled, (state, {payload}) => {
                state.productsByCategory = payload
                state.loading = false
                state.error = false
            })
            .addCase(fetchProductsById.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductsById.rejected, (state) => {
                state.error = true
            })
    }
})

export default categoriesSlice.reducer