import { createSlice } from "@reduxjs/toolkit";

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {
   
    getFeatureRequest: (state) => {
      state.loading = true;
    },
    getFeatureSuccess: (state, action) => {
      state.loading = false;
      state.images = action.payload;
    },
    getFeatureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  
    addFeatureRequest: (state) => {
      state.loading = true;
    },
    addFeatureSuccess: (state, action) => {
      state.loading = false;
      state.images.push(action.payload);
    },
    addFeatureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    resetFeature: (state) => {
      state.error = null;
      state.loading = false;
    }
  },
});


export const {
  getFeatureRequest,
  getFeatureSuccess,
  getFeatureFail,
  addFeatureRequest,
  addFeatureSuccess,
  addFeatureFail,
  resetFeature,
} = featureSlice.actions;

export default featureSlice.reducer;