import { toast } from "react-toastify";
import axios from "../../api/api.jsx";
import { loadProducts } from "../reducers/adminslice.js";

export const asyncCreateProduct = (productData) => async (dispatch) => {


  try {
    const res = await axios.post(
      "/api/admin/products/upload-image",
      productData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(loadProducts(res.data.product));
    console.log("res url:",res.data.product)
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to create product");
    console.log("Create product error:", err);
  }
};



