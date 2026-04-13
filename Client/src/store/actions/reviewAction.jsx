import {
    fetchReviewRequest,
    fetchReviewSuccess,
    fetchReviewFail,
    addReviewSuccess,
} from "../reducers/reviewSlice.js";
import axios from "../../api/api.jsx";
import { toast } from "react-toastify";

export const addReview = (data) => async (dispatch) => {
  try {
    dispatch(fetchReviewRequest());

    const res = await axios.post("/api/shop/review/add", data);

   

    toast.success(res.data.message);

   
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Error");
    dispatch(fetchReviewFail(error.message));
  }
};

export const getReview = (productId) => async (dispatch) => {
    try {
        dispatch(fetchReviewRequest());

        const res = await axios.get(`/api/shop/review/get/${productId}`);

        console.log("review data", res.data);

        dispatch(fetchReviewSuccess(res.data.data));

    } catch (error) {
        dispatch(
            fetchReviewFail(
                error.response?.data?.message || error.message
            )
        );
    }
};