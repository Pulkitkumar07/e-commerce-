import { configureStore } from "@reduxjs/toolkit";
import userSlice from"./reducers/userSlice.js";
import adminSlice from './reducers/adminslice.js'


const store=configureStore({
    reducer:{
        user:userSlice,
        product:adminSlice,
        
    },
});

export default store;