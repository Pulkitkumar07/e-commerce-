import axios from "../../api/api.jsx";
import endpoints from "../../api/endpoints.js";
import { toast } from "react-toastify";
import { 
  getFeatureRequest, 
  getFeatureSuccess, 
  getFeatureFail,
  addFeatureRequest,
  addFeatureSuccess,
  addFeatureFail 
} from "../reducers/featureSlice.js";
import getErrorMessage from "./getErrorMessage.js";

export const uploadFeatureImage = (formData) => async (dispatch) => {
  try {
    dispatch(addFeatureRequest());

    const { data } = await axios.post(
      endpoints.admin.feature.add,
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
      await dispatch(getFeatureImages());
      return data.data;
    }

  } catch (error) {
    const errorMsg = getErrorMessage(error, "Image upload failed");
    dispatch(addFeatureFail(errorMsg));
    toast.error(errorMsg);
    throw error;
  }
};

export const getFeatureImages = () => async (dispatch) => {
  try {
    dispatch(getFeatureRequest());

    const { data } = await axios.get(endpoints.admin.feature.get);

    if (data.success) {
      dispatch(getFeatureSuccess(data.data));
      return data.data;
    }

  } catch (error) {
    const errorMsg = getErrorMessage(error, "Error fetching feature images");
    dispatch(getFeatureFail(errorMsg));
    throw error;
  }
};
