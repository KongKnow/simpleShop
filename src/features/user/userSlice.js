import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import axios from 'axios'

export const createUser = createAsyncThunk(
    'user/createUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/users/`, payload)
            return res.data
        } catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload)
            return res.data
        } catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, payload)
            const login = await axios(`${BASE_URL}/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${res.data.access_token}`
                }
            })
            return login.data
        } catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)


const initialState ={
    currentUser: null,
    cart: [],
    formType: 'signup',
    showForm: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addItemToCart: (state, {payload}) => {
            let newCart = [...state.cart]
            const found = state.cart.find(({id, currentSize}) => id === payload.id && currentSize === payload.currentSize)

            if(found) {
                newCart = newCart.map(item => {
                    return item.id === payload.id && item.currentSize === payload.currentSize ? {...item, quantity: payload.quantity || item.quantity + 1} : item
                })
            } else {
                newCart.push({...payload, quantity: 1})
            }

            state.cart = newCart
        },
        formState: (state, {payload}) => {
            state.showForm = payload
        },
        changeFormType: (state, {payload}) => {
            state.formType = payload
        },
        removeItemFromCart: (state, {payload}) => {
            state.cart = state.cart.filter(item => {
                console.log((item.id !== payload.id) && (item.currentSize !== payload.currentSize))
                return (item.id !== payload.id) || (item.currentSize !== payload.currentSize)
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state, {payload}) => {
                state.currentUser= payload
            })
            .addCase(loginUser.fulfilled, (state, {payload}) => {
                state.currentUser= payload
            })
            .addCase(updateUser.fulfilled, (state, {payload}) => {
                state.currentUser= payload
            })
    }
})

export const {addItemToCart, removeItemFromCart, formState, changeFormType} = userSlice.actions
export default userSlice.reducer