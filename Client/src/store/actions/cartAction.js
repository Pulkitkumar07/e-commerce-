import {
    cartStart,
    loadCartItems,
    cartFail
} from "../reducers/cartProduct.js";

import axios from "../../api/api.jsx";
import endpoints from "../../api/endpoints.js";
import getErrorMessage from "./getErrorMessage.js";


export const addtoCart = (userId, productId, quantity) => async (dispatch) => {
    dispatch(cartStart());

    try {
        const { data } = await axios.post(endpoints.shop.cart.add, { userId, productId, quantity });
        await dispatch(fetchCartItems(userId));
        return data.data.cart;
    } catch (error) {
        const message = getErrorMessage(error, "Error adding cart item");
        dispatch(cartFail(message));
        throw error;
    }
}

export const fetchCartItems = (userId) => async (dispatch) => {
    dispatch(cartStart());

    try {
        const response = await axios.get(endpoints.shop.cart.get(userId));
        const cartItems = response.data.data.cartItems;
        dispatch(loadCartItems(cartItems));
        return cartItems;

    } catch (error) {
        const message = getErrorMessage(error, "Error fetching cart items");
        dispatch(cartFail(message));
        throw error;
    }
}
export const deleteCartItem = (userId, productId) => async (dispatch) => {
    dispatch(cartStart());
    try {
        const response = await axios.delete(endpoints.shop.cart.delete(userId, productId));
        const cartItems = response.data.data.cartItems;
        dispatch(loadCartItems(cartItems));
        return cartItems;

    } catch (error) {
        const message = getErrorMessage(error, "Error deleting cart item");
        dispatch(cartFail(message));
        throw error;
    }
}

export const updateCartItemQty = (userId, productId, quantity) => async (dispatch) => {
    dispatch(cartStart());
    
    try {
        const response = await axios.put(
            endpoints.shop.cart.update(userId, productId),
            { quantity }
        );
        const cartItems = response.data.data.cartItems;
        dispatch(loadCartItems(cartItems));
        return cartItems;

    } catch (error) {
        const message = getErrorMessage(error, "Error updating cart item quantity");
        dispatch(cartFail(message));
        throw error;
    }
}

export const clearCartAfterOrder = (userId) => async (dispatch) => {
    dispatch(cartStart());
    try {
        await axios.delete(endpoints.shop.cart.clear(userId));
        dispatch(loadCartItems([]));
        return [];

    } catch (error) {
        const message = getErrorMessage(error, "Error clearing cart");
        dispatch(cartFail(message));
        throw error;
    }
}
