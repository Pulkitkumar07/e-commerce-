import { toast } from "react-toastify";
import axios from "../../api/api.jsx";
import endpoints from "../../api/endpoints.js";
import { loaduser, removeuser } from "../reducers/userSlice";
import getErrorMessage from "./getErrorMessage.js";


export const asyncloginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(endpoints.auth.login, user, {
      withCredentials: true,
    });

    
    const userData = res.data.data.user;

    localStorage.setItem("user", JSON.stringify(userData));
       
    dispatch(loaduser(userData));
    toast.success("Login successful!");
    return userData;

  } catch (error) {
    const message = getErrorMessage(error, "Login failed. Please check credentials.");
    toast.error(message);
    throw error;
  }
};

export const asyncRegisterUser = (user) => async () => {
  try {
    const { data } = await axios.post(endpoints.auth.register, user);
    toast.success("Registration successful!");
    return data;
  } catch (err) {
    const message = getErrorMessage(err, "Registration failed");
    toast.error(message);
    throw err;
  }
};


export const asyncLogoutUser = () => async (dispatch) => {
  await axios.post(endpoints.auth.logout, {}, { withCredentials: true });

  localStorage.removeItem("user");
  dispatch(removeuser());
  toast.success("Logged out successfully!");
  return true;
};


export const asyncGetuserProfile = () => async (dispatch) => {
  
  try{
   const res = await axios.get(endpoints.auth.profile, { withCredentials: true });
   const user = res.data.data.user;
   
   
   dispatch(loaduser(user));
   return user;

  }catch{
     dispatch(removeuser());
     return null;
    
  }
 
};
