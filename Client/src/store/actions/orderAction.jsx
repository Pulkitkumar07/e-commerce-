

import { addOrder, setOrderId,setOrderDetails } from "../reducers/orderSlice";
import axios from "../../api/api.jsx";




export const createOrder = (orderData) => async (dispatch) => {
  console.log("Creating order with data:", orderData); 
  try {
    const response = await axios.post(
      "/api/shop/order/create",
      orderData
    );

    const data = response.data;

    if (data?.success) {
      dispatch(setOrderId(data.orderId));
      dispatch(addOrder(data));
    }

    return data; 

  } catch (error) {
    console.error("Error creating order:", error);
  }
};



export const capturePayment = (paymentData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/shop/order/capture",
      paymentData
    );
      
    const data = response.data;
    
    
    if (data?.success) {
      return data; 
    }

  } catch (error) {
    console.error("Error capturing payment:", error);
  }
};

export const getAllOrders = (userId) => async (dispatch) => {
  if (!userId) return; 
  try {
    const response = await axios.get(`/api/shop/order/all/${userId}`);
    const data = response.data;

    if (data?.success) {
      
      dispatch(addOrder(data.orders)); 
    }
  } catch (error) {
    console.error("Error fetching user orders:", error);
  }
};
export const getOrderDetails=(orderId)=>async(dispatch)=>{
  try{
     const response=await axios.get(`/api/shop/order/details/${orderId}`);
     const data=response.data;
     
     if(data?.success){
      dispatch(setOrderDetails(data.data));
     }
     
  }catch(error){
    console.error("Error fetching order details:", error);
  }
}

export const resetOrderDetails=()=>async(dispatch)=>{
  dispatch(setOrderDetails(null));
} 


