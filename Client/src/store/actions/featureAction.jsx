import axios from "../../api/api.jsx";
import { toast } from "react-toastify";
import { 
  getFeatureRequest, 
  getFeatureSuccess, 
  getFeatureFail,
  addFeatureRequest,
  addFeatureSuccess,
  addFeatureFail 
} from "../reducers/featureSlice.js";

export const uploadFeatureImage = (formData) => async (dispatch) => {
  try {
    dispatch(addFeatureRequest());

    const { data } = await axios.post(
      "/api/admin/feature/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      dispatch(addFeatureSuccess(data.data));
      toast.success("Image successfully uploaded");
      dispatch(getFeatureImages());
    }

  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(addFeatureFail(errorMsg));
    toast.error(errorMsg);
  }
};

export const getFeatureImages = () => async (dispatch) => {
  try {
    dispatch(getFeatureRequest());

    const { data } = await axios.get("/api/admin/feature/get");

    if (data.success) {
      dispatch(getFeatureSuccess(data.data));
    }

  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(getFeatureFail(errorMsg));
  }
};