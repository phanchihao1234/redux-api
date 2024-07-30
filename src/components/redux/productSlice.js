import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"



const initialState = {
    products: [],
    status: 'start',
    error: null
}


export const fetchProducts = createAsyncThunk('aaaa', async () => {
    const res = await axios.get("https://63e9ae764f3c6aa6e7d06a70.mockapi.io/student")
    return res.data
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.start = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.start = 'succeeded'
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.start = 'failed'
                state.products = action.error.payload
            })
    }
})


export const { } = productSlice.actions
export default productSlice.reducer