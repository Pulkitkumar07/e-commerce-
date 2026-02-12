import { toast } from "react-toastify";
import axios from "../../api/api.jsx";

import {
  productStart,
  productFail,
  addProduct,
  loadProducts,
} from "../reducers/adminslice.js";
import { removeuser } from "../reducers/userSlice.js";


export const asyncCreateProduct = (formData) => async (dispatch) => {
  try {
    dispatch(productStart());

    const res = await axios.post(
      "/api/admin/products/add",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

   
    dispatch(addProduct(res.data.product));

    toast.success("Product created successfully!");
  } catch (err) {
    dispatch(productFail(err.response?.data?.message));
    toast.error(err.response?.data?.message || "Failed to create product");
    console.error("Create product error:", err);
  }
};


export const asyncEditProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch(productStart());

    await axios.put(
      `/api/admin/products/edit/${id}`, 
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

   
    dispatch(asyncFetchProducts());
    toast.success("Product updated successfully!");
  } catch (err) {
    dispatch(productFail(err.response?.data?.message));
    toast.error(err.response?.data?.message || "Failed to edit product");
    console.error("Edit product error:", err);
  }
};


export const asyncDeleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(productStart());

    await axios.delete(
      `/api/admin/products/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(asyncFetchProducts()); 
    toast.success("Product deleted successfully!");
  } catch (err) {
    dispatch(productFail(err.response?.data?.message));
    toast.error(err.response?.data?.message || "Failed to delete product");
    console.error("Delete product error:", err);
  }
};


export const asyncFetchProducts = () => async (dispatch) => {
  try {
    dispatch(productStart());

    const res = await axios.get(
      "/api/admin/products/get",
      { withCredentials: true }
    );

    dispatch(loadProducts(res.data.products));
  } catch (err) {
    dispatch(productFail(err.response?.data?.message));
    console.error("Fetch products error:", err);
  }
};






