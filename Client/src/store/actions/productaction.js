import axios from "../../api/api.jsx";
import endpoints from "../../api/endpoints.js";
import qs from "qs";

import {
  productStart,
  productFail,
  loadProducts,
  loadProductDetails,
  clearProductDetails
} from "../reducers/productSlice.js";
import getErrorMessage from "./getErrorMessage.js";

export const asyncFetchProducts =
  (filters, sortOption) => async (dispatch) => {
    try {
      

      dispatch(productStart());

      const res = await axios.get(
        endpoints.shop.products.list,
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

      const products = res.data.data.products;
      dispatch(loadProducts(products));
      return products;

    } catch (err) {
      const message = getErrorMessage(err, "Fetch products error");
      dispatch(productFail(message));
      throw err;
    }
  };

export const asyncFetchProductDetails=(id)=>async(dispatch)=>{
  try{
  
    
    dispatch(productStart());
    const res = await axios.get(endpoints.shop.products.details(id));
    const product = res.data.data;
    dispatch(loadProductDetails(product));
    return product;
    
   

  }catch(error){
    const message = getErrorMessage(error, "Error fetching product details");
    dispatch(productFail(message));
    throw error;
  }
  
}

export const asyncClearProductDetails=()=>async(dispatch)=>{
  dispatch(clearProductDetails());
}
