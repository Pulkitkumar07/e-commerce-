
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderId: null,
    orders: [],
    orderDetails: null,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addOrder: (state, action) => {
            state.orders = action.payload;
            state.loading = false;
        },
        setOrderId: (state, action) => {
            state.orderId = action.payload;
            state.loading = false;
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
            state.loading = false;
        },
        orderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

       
        resetOrderDetails: (state) => {
            state.orderDetails = null;  
        },
    }
});

export const { addOrder, removeOrder, setOrderId, setOrderDetails, resetOrderDetails, orderStart, orderFail } = orderSlice.actions;
export default orderSlice.reducer;
