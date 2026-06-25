import { toast } from "react-toastify";
import axios from "../../api/api.jsx";
import endpoints from "../../api/endpoints.js";

import {
  productStart,
  productFail,
  addProduct,
  loadProducts,
} from "../reducers/adminslice.js";
import getErrorMessage from "./getErrorMessage.js";



export const asyncCreateProduct = (formData) => async (dispatch) => {
  try {
    dispatch(productStart());

    const res = await axios.post(
      endpoints.admin.products.add,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

   
    const product = res.data.data;
    dispatch(addProduct(product));

    toast.success("Product created successfully!");
    return product;
  } catch (err) {
    const message = getErrorMessage(err, "Failed to create product");
    dispatch(productFail(message));
    toast.error(message);
    throw err;
  }
};


export const asyncEditProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch(productStart());

    const { data } = await axios.put(
      endpoints.admin.products.edit(id), 
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

   
    dispatch(asyncFetchProducts());
    toast.success("Product updated successfully!");
    return data.data;
  } catch (err) {
    const message = getErrorMessage(err, "Failed to edit product");
    dispatch(productFail(message));
    toast.error(message);
    throw err;
  }
};


export const asyncDeleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(productStart());

    const { data } = await axios.delete(
      endpoints.admin.products.delete(id),
      { withCredentials: true }
    );

    dispatch(asyncFetchProducts()); 
    toast.success("Product deleted successfully!");
    return data.data;
  } catch (err) {
    const message = getErrorMessage(err, "Failed to delete product");
    dispatch(productFail(message));
    toast.error(message);
    throw err;
  }
};


export const asyncFetchProducts = () => async (dispatch) => {
  try {
    dispatch(productStart());

    const res = await axios.get(
      endpoints.admin.products.get,
      { withCredentials: true }
    );

    const products = res.data.data;
    dispatch(loadProducts(products));
    return products;
  } catch (err) {
    const message = getErrorMessage(err, "Fetch products error");
    dispatch(productFail(message));
    throw err;
  }
};



