import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import cartSlice from './cartSlice'
import catsSlice from './catsSlice'

// const store = configureStore({ reducer: rootReducer })
const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartSlice,
        cats: catsSlice,
    }
})
export default store