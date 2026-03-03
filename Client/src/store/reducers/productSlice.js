import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  products: [],      
  isLoading: false,
  error: null,
  productDetails:null
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
      
    loadProductDetails: (state, action) => {
      state.productDetails = action.payload;
      state.isLoading = false;
    },
    clearProductDetails: (state) => {
      state.productDetails = null;
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
  loadProductDetails,
  clearProductDetails,
} = productSlice.actions;

export default productSlice.reducer;
