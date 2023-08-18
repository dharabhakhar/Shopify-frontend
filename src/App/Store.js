import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './Counter/counter'

export const store = configureStore({
  reducer: {
    counter: counterSlice
  },
})