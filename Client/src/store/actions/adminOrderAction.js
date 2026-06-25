import axios from '../../api/api.jsx';
import endpoints from '../../api/endpoints.js';
import { addOrder, orderFail, orderStart, setOrderDetails } from '../reducers/adminOrderSlice.js';
import getErrorMessage from './getErrorMessage.js';


export const GetAllOrders = () => async (dispatch) => {
  dispatch(orderStart());
  try {
    const res = await axios.get(endpoints.admin.orders.all);

    const orders = res.data.data;
    dispatch(addOrder(orders)); 
    return orders;
  } catch (error) {
    const message = getErrorMessage(error, "Error fetching orders");
    dispatch(orderFail(message));
    throw error;
  }
};

export const GetOrderDetails = (orderId) => async (dispatch) => {
  dispatch(orderStart());
  try {
    const { data } = await axios.get(endpoints.admin.orders.details(orderId));
    dispatch(setOrderDetails(data.data));
    return data.data;

  } catch (error) {
    const message = getErrorMessage(error, "Error fetching order details");
    dispatch(orderFail(message));
    throw error;
  }
};

export const removeOrderDetails = () => (dispatch) => {
  dispatch(setOrderDetails(null));
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  dispatch(orderStart());
  try {
    const { data } = await axios.put(endpoints.admin.orders.updateStatus(orderId), { status });
    await dispatch(GetAllOrders());
    return data.data;
   

  } catch (error) {
    const message = getErrorMessage(error, "Error updating order status");
    dispatch(orderFail(message));
    throw error;
  }
};
