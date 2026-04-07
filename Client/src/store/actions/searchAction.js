import axios from "../../api/api.jsx";
import { searchFail,searchRequest ,searchSuccess ,clearResults} from "../reducers/searchSlice.js";

export const getSearchResults = (keyword) => async (dispatch) => {
  try {
    dispatch(searchRequest());
    
    const { data } = await axios.get(`api/shop/search/${keyword}`);
    console.log("data se",data.data)

    dispatch(searchSuccess(data.data));
    return data;
  } catch (error) {
    dispatch(searchFail(error.message));
  }
};
export const clearSearchResults = () => (dispatch) => {
  dispatch(clearResults());
};