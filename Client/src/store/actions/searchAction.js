import axios from "../../api/api.jsx";
import endpoints from "../../api/endpoints.js";
import { searchFail,searchRequest ,searchSuccess ,clearResults} from "../reducers/searchSlice.js";
import getErrorMessage from "./getErrorMessage.js";

export const getSearchResults = (keyword) => async (dispatch) => {
  try {
    dispatch(searchRequest());
    
    const { data } = await axios.get(endpoints.shop.search(keyword));

    dispatch(searchSuccess(data.data));
    return data.data;
  } catch (error) {
    const message = getErrorMessage(error, "Error fetching search results");
    dispatch(searchFail(message));
    throw error;
  }
};
export const clearSearchResults = () => (dispatch) => {
  dispatch(clearResults());
};
