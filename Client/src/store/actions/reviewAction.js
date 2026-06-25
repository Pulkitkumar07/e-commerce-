import {
    fetchReviewRequest,
    fetchReviewSuccess,
    fetchReviewFail,
} from "../reducers/reviewSlice.js";
import axios from "../../api/api.jsx";
import endpoints from "../../api/endpoints.js";
import { toast } from "react-toastify";
import getErrorMessage from "./getErrorMessage.js";

export const addReview = (data) => async (dispatch) => {
  try {
    dispatch(fetchReviewRequest());

    const res = await axios.post(endpoints.shop.review.add, data);

    toast.success(res.data.message);
    return res.data.data;
  } catch (error) {
    const message = getErrorMessage(error, "Error adding review");
    toast.error(message);
    dispatch(fetchReviewFail(message));
    throw error;
  }
};

export const getReview = (productId) => async (dispatch) => {
    try {
        dispatch(fetchReviewRequest());

        const res = await axios.get(endpoints.shop.review.get(productId));

        const reviews = res.data.data;
        dispatch(fetchReviewSuccess(reviews));
        return reviews;

    } catch (error) {
        const message = getErrorMessage(error, "Error fetching reviews");
        dispatch(fetchReviewFail(message));
        throw error;
    }
};
