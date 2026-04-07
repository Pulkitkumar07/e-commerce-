import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  selectedAddress: null,
  isLoading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {

    addressStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  
    addAddress: (state, action) => {
      state.addresses.unshift(action.payload);
      state.isLoading = false;
    },


    loadAddresses: (state, action) => {
      state.addresses = action.payload;
      state.isLoading = false;
    },


    addressFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addressStart,
  addAddress,
  loadAddresses,
  addressFail,
  setSelectedAddress
} = addressSlice.actions;

export default addressSlice.reducer;
