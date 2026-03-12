import { configureStore } from "@reduxjs/toolkit";
import userSlice from"./reducers/userSlice.js";
import adminSlice from './reducers/adminslice.js'
import productSlice from './reducers/productSlice.js'
import cartProductSlice from './reducers/cartProduct.js'
import addressSlice from './reducers/addressSlice.js'
const store = configureStore({
  reducer: {
    user: userSlice,
    adminProduct: adminSlice,
    shopProduct: productSlice,
    cartProduct: cartProductSlice,
    addressList: addressSlice
  },
});


export default store;