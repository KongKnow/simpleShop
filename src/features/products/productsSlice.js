import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/products`)
            return res.data
        } catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const fetchSearchProducts = createAsyncThunk(
    'products/fetchSearchProducts',
    async (title, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/products/?title=${title}`)
            return res.data
        } catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const initialState ={
    products: [],
    filtered: [],
    related: [],
    searchProducts: []
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterByPrice: (state, {payload}) => {
            state.filtered = state.products.filter(({price}) => price < payload)
        },
        relatedProducts: (state, {payload}) => {
            state.related = state.products.filter(({category: { id }}) => id === payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, {payload}) => {
                state.products = payload
            })
            .addCase(fetchSearchProducts.fulfilled, (state, {payload}) => {
                state.searchProducts = payload
            })
    }
})

export const {filterByPrice, relatedProducts} = productsSlice.actions
export default productsSlice.reducer