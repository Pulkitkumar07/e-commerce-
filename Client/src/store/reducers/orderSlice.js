
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderId: null,
    orders: [],
    orderDetails: null,
    loading: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders = action.payload;
        },
        setOrderId: (state, action) => {
            state.orderId = action.payload;
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },

       
        resetOrderDetails: (state) => {
            state.orderDetails = null;  
        },
    }
});

export const { addOrder, removeOrder, setOrderId, setOrderDetails, resetOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
