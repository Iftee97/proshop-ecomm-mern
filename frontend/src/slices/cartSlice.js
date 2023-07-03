import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x._id === item._id)
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x) // if item exists, replace it with new item (item with new qty, not increase the qty) else return x (item with old qty)
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId)
      return updateCart(state)
    },
    clearCartItems: (state, action) => {
      state.cartItems = []
      return updateCart(state)
    },
  },
})

export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions
export const cartReducer = cartSlice.reducer
