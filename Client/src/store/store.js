import { configureStore } from "@reduxjs/toolkit";
import userSlice from"./reducers/userSlice.js";
import adminSlice from './reducers/adminslice.js'
import productSlice from './reducers/productSlice.js'
const store = configureStore({
  reducer: {
    user: userSlice,
    adminProduct: adminSlice,
    shopProduct: productSlice,
  },
});


export default store;