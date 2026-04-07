import { configureStore } from "@reduxjs/toolkit";
import userSlice from"./reducers/userSlice.js";
import adminSlice from './reducers/adminslice.js'
import productSlice from './reducers/productSlice.js'
import cartProductSlice from './reducers/cartProduct.js'
import addressSlice from './reducers/addressSlice.js'
import OrderSlice from './reducers/orderSlice.js'
import AdminOrderSlice from './reducers/adminOrderSlice.js'
import shopSearchslice from './reducers/searchSlice.js'
const store = configureStore({
  reducer: {
    user: userSlice,
    adminProduct: adminSlice,
    shopProduct: productSlice,
    cartProduct: cartProductSlice,
    addressList: addressSlice,
    orderList: OrderSlice,
    adminOrder: AdminOrderSlice,
    shopSearchslice:shopSearchslice
  },

});


export default store;