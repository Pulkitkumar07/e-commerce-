
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    OrderList: [],
    orderDetails: null,
};

const AdminOrderSlice = createSlice({
    name: "AdminOrder",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.OrderList = action.payload;
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        },
    }
});

export const { addOrder, setOrderDetails, resetOrderDetails } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
