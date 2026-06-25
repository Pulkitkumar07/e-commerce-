
import { addOrder, orderFail, orderStart, setOrderId, setOrderDetails } from "../reducers/orderSlice.js";
import axios from "../../api/api.jsx";
import endpoints from "../../api/endpoints.js";
import getErrorMessage from "./getErrorMessage.js";


export const createOrder = (orderData) => async (dispatch) => {
  dispatch(orderStart());
  try {
    const { data } = await axios.post(endpoints.shop.orders.create, orderData);
    const createdOrder = data.data;

    dispatch(setOrderId(createdOrder.orderId));

    return createdOrder; 

  } catch (error) {
    const message = getErrorMessage(error, "Error creating order");
    dispatch(orderFail(message));
    throw error;
  }
};



export const capturePayment = (paymentData) => async () => {
  const { data } = await axios.post(endpoints.shop.orders.capture, paymentData);
  return data.data; 
};

export const getAllOrders = (userId) => async (dispatch) => {

  if (!userId) return; 
  dispatch(orderStart());
  try {
    const { data } = await axios.get(endpoints.shop.orders.all(userId));
    dispatch(addOrder(data.data)); 
    return data.data;
  } catch (error) {
    const message = getErrorMessage(error, "Error fetching user orders");
    dispatch(orderFail(message));
    throw error;
  }
};
export const getOrderDetails=(orderId)=>async(dispatch)=>{
  dispatch(orderStart());
  try{
     const { data } = await axios.get(endpoints.shop.orders.details(orderId));
     dispatch(setOrderDetails(data.data));
     return data.data;
     
  }catch(error){
    const message = getErrorMessage(error, "Error fetching order details");
    dispatch(orderFail(message));
    throw error;
  }
}

export const resetOrderDetails=()=>async(dispatch)=>{
  dispatch(setOrderDetails(null));
} 
