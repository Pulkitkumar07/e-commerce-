import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],      
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {

    productStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
   
    loadProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },

    productFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  productStart,
  loadProducts,
  productFail,
} = productSlice.actions;

export default productSlice.reducer;
