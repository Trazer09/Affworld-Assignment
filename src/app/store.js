import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice'; // 1. Import product reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer, // 2. Add it to the reducers object
  },
});