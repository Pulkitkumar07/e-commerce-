import axios from "../../api/api.jsx";

import {
  productStart,
  productFail,
  
  loadProducts,
} from "../reducers/productSlice.js";


export const asyncFetchProducts = () => async (dispatch) => {
  try {
    dispatch(productStart());

    const res = await axios.get(
      "/api/shop/products/get",
      { withCredentials: true }
    );

    dispatch(loadProducts(res.data.products));
  } catch (err) {
    dispatch(productFail(err.response?.data?.message));
    console.error("Fetch products error:", err);
  }

}