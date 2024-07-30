import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"



const initialState = {
    cats: [],

    status: 'start',
    error: null
}

const url = "https://63e9ae764f3c6aa6e7d06a70.mockapi.io/student"
export const fetchCats = createAsyncThunk('cats/fetchCats', async () => {
    const res = await axios.get(url)
    return res.data
})
export const deleteCats = createAsyncThunk("cats/deleteCat", async (id) => {
    await axios.delete(url + "/" + id)
    return id
})
export const addNewCat = createAsyncThunk("cats/addNewCat", async (cat) => {
    const res = await axios.post(url, cat)
    return res.data
})
export const reCheck = createAsyncThunk("cats/reCheck", async (cat) => {
    const res = await axios.put(url + "/" + cat.id, { ...cat, status: !cat.status })
    return res.data
})
const catsSlice = createSlice({
    name: "cats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCats.pending, (state) => {
                state.start = 'loading'
            })
            .addCase(fetchCats.fulfilled, (state, action) => {
                state.start = 'succeeded'
                state.cats = action.payload
            })
            .addCase(fetchCats.rejected, (state, action) => {
                state.start = 'failed'
                state.cats = action.error.payload
            })
            .addCase(deleteCats.fulfilled, (state, action) => {
                state.cats = state.cats.filter(item => item.id !== action.payload)
            })
            .addCase(addNewCat.fulfilled, (state, action) => {
                state.cats = [...state.cats, action.payload]
            })
            .addCase(reCheck.fulfilled, (state, action) => {
                state.cats = state.cats.map(item => item.id === action.payload.id ? { ...item, status: !item.status } : item)
            })
    }
})


export default catsSlice.reducer