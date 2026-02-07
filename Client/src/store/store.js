import { configureStore } from "@reduxjs/toolkit";
import userSlice from"./reducers/userSlice.js";


const store=configureStore({
    reducer:{
        user:userSlice,
        
    },
});

export default store;