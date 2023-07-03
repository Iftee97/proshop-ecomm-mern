import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import { cartReducer } from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },
  devTools: true,
})
