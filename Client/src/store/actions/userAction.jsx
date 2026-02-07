import { toast } from "react-toastify";
import axios from "../../api/api.jsx";
import { loaduser, removeuser } from "../reducers/userSlice";


export const asyncloginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/login", user, {
      withCredentials: true,
    });


    localStorage.setItem("user", JSON.stringify(res.data.user));

    dispatch(loaduser(res.data.user));
    toast.success("Login successful!");

  } catch (error) {
    toast.error("Login failed. Please check credentials.");
    console.log("Login Error:", error.response?.data || error.message);
  }
};

export const asyncRegisterUser = (user) => async () => {
  try {
    await axios.post("/api/auth/register", user);
    toast.success("Registration successful!");
  } catch (err) {
    toast.error(err.response?.data?.message || "Registration failed");
    console.log("Registration error:", err);
  }
};


export const asyncLogoutUser = () => async (dispatch) => {
  try {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });

    localStorage.removeItem("user");
    dispatch(removeuser());
    toast.success("Logged out successfully!");
   

  } catch (err) {
    console.log("Logout error:", err);
  }
};


export const asyncGetuserProfile = () => async (dispatch) => {
  
  try{
   const res = await axios.get("/api/auth/profile", { withCredentials: true });
   const user = res.data.user;
   console.log("user profile:",user);
   
   dispatch(loaduser(user));

  }catch(err){
    console.log("Fetch profile error:", err.message);
     dispatch(removeuser());
    
  }
 
};
