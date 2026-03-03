import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

const cartItemsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    cartStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    loadCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.isLoading = false;
    },

    cartFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearCart: (state) => {
      state.cartItems = [];
    }

  },
});

export const {
  cartStart,
  loadCartItems,
  cartFail,
  clearCart
} = cartItemsSlice.actions;

export default cartItemsSlice.reducer;