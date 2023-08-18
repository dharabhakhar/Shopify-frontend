import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 val:1,
 cart: []
}

export const counterSlice = createSlice({
 name: 'counter',
 initialState,
 reducers: {
  increment: (state, action) => {
   const item = state.cart.find((item) => item.id === action.payload);
   item.quantity++;
   // state.val++;
  },
  decrement: (state, action) => {
   const item = state.cart.find((item) => item.id === action.payload);
   if (item.quantity === 1) {
    item.quantity = 1
    // state.val = 1
   } else {
    item.quantity--;
    // state.val--
   }
  },
  addToCart: (state, action) => {
   const itemInCart = state.cart.find((item) => item.id === action.payload.id);
   if (itemInCart) {
    itemInCart.quantity ++;
   } else {
    // var value = itemInCart.quantity;
    // console.log(value);
    state.cart.push({ ...action.payload, quantity: 1 });
   }
  },
  removeItem: (state, action) => {
   const removeItem = state.cart.filter((item) => item.id !== action.payload);
   state.cart = removeItem;
  },
 },
})

export const { increment, decrement, removeItem, addToCart } = counterSlice.actions

export default counterSlice.reducer