
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    OrderList: [],
    orderDetails: null,
    loading: false,
    error: null,
};

const AdminOrderSlice = createSlice({
    name: "AdminOrder",
    initialState,
    reducers: {
        orderStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addOrder: (state, action) => {
            state.OrderList = action.payload;
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

export const { addOrder, setOrderDetails, resetOrderDetails, orderStart, orderFail } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
