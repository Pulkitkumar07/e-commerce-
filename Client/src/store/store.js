import { configureStore } from "@reduxjs/toolkit";
import userSlice from"./reducers/userSlice.js";
import adminSlice from './reducers/adminslice.js'
import productSlice from './reducers/productSlice.js'
import cartProductSlice from './reducers/cartProduct.js'
const store = configureStore({
  reducer: {
    user: userSlice,
    adminProduct: adminSlice,
    shopProduct: productSlice,
    cartProduct: cartProductSlice
  },
});


export default store;