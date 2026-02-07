import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],      // ✅ lowercase
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    productStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

  
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
      state.isLoading = false;
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
  addProduct,
  loadProducts,
  productFail,
} = productSlice.actions;

export default productSlice.reducer;
