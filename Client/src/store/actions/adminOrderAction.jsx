import axios from '../../api/api.jsx';
import { addOrder, setOrderDetails } from '../reducers/adminOrderSlice.js';


export const GetAllOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin/order/AllUserOrders");

    dispatch(addOrder(res.data.data)); 
  } catch (error) {
    console.log("Error fetching orders:", error);
  }
};

export const GetOrderDetails = (orderId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/admin/order/OrderDetails/${orderId}`);
    const data = response.data; 
    console.log("Fetched order details:", data.data);

    if (data?.success) {
      dispatch(setOrderDetails(data.data)) 
    }

  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};

export const removeOrderDetails = () => (dispatch) => {
  dispatch(setOrderDetails(null));
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/admin/order/UpdateOrderStatus/${orderId}`, { status });
    const data = response.data; 
    console.log("Order status updated:", data);
    dispatch(GetAllOrders());
   

  } catch (error) {
    console.error("Error updating order status:", error);
  }
};