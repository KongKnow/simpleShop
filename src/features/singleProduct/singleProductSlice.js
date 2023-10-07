import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import axios from 'axios'


export const fetchSingleProduct = createAsyncThunk(
    'singleProduct/fetchSingleProduct',
    async (id, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/products/${id}`)
            return res.data
        } catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const initialState ={
    singleProduct: {}
}

const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleProduct.fulfilled, (state, {payload}) => {
                state.singleProduct = payload
            })
    }
})

export default singleProductSlice.reducer