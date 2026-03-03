import axios from "../../api/api.jsx";
import qs from "qs";

import {
  productStart,
  productFail,
  loadProducts,
  loadProductDetails,
  clearProductDetails
} from "../reducers/productSlice.js";

export const asyncFetchProducts =
  (filters, sortOption) => async (dispatch) => {
    try {
      

      dispatch(productStart());

      const res = await axios.get(
        "/api/shop/products/get",
        {
          params: {
            ...(filters?.category?.length > 0 && {
              category: filters.category,
            }),
            ...(filters?.brand?.length > 0 && {
              brand: filters.brand,
            }),
            ...(filters?.price && {
              price: filters.price,
            }),
            ...(sortOption && {
              sort: sortOption,
            }),
          },

     
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),

          withCredentials: true,
        }
      );

      dispatch(loadProducts(res.data.products));

    } catch (err) {
      dispatch(productFail(err.response?.data?.message));
      console.error("Fetch products error:", err);
    }
  };

export const asyncFetchProductDetails=(id)=>async(dispatch)=>{
  try{
  
    
    dispatch(productStart());
    const res = await axios.get(`/api/shop/products/get/${id}`);
    dispatch(loadProductDetails(res.data.data));
    console.log(res.data.data);
    
   

  }catch(error){
    dispatch(productFail(error.response?.data?.message || "Error"));
  }
  
}

export const asyncClearProductDetails=()=>async(dispatch)=>{
  dispatch(clearProductDetails());
}
