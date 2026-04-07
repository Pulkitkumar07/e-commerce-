import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  searchResults: [],
  error: null
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchRequest: (state) => {
      state.isLoading = true;
    },
    searchSuccess: (state, action) => {
      state.isLoading = false;
      state.searchResults = action.payload;
    },
    searchFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearResults: (state) => {
      state.searchResults = [];
    }
  }
});

export const {
  searchRequest,
  searchSuccess,
  searchFail,
  clearResults
} = searchSlice.actions;

export default searchSlice.reducer;