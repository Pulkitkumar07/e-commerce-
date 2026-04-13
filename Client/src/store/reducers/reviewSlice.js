import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  success: false,
};


const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {

    fetchReviewRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

  
    fetchReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },

   
    fetchReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  
    addReviewSuccess: (state, action) => {
      state.reviews = action.payload;
      state.success = true;
    },

    
    resetReviewState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  fetchReviewRequest,
  fetchReviewSuccess,
  fetchReviewFail,
  addReviewSuccess,
  resetReviewState,
} = reviewSlice.actions;

export default reviewSlice.reducer;