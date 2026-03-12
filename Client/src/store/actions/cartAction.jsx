import {
    cartStart,
    loadCartItems,
    cartFail,
    clearCart
} from "../reducers/cartProduct.js";

import axios from "../../api/api.jsx";


export const addtoCart = (userId, productId, quantity) => async (dispatch) => {
    dispatch(cartStart());
    console.log("Adding to cart:", { userId, productId, quantity });

    try {
        const response = await axios.post("/api/shop/cart/add", { userId, productId, quantity });
        dispatch(loadCartItems(response.data.cart.items));
        console.log("Cart item added successfully:", response.data.cart.items);
        dispatch(fetchCartItems(userId));
    } catch (error) {
        dispatch(cartFail(error.message));
        console.error("Error fetching cart items:", error);
    }
}

export const fetchCartItems = (userId) => async (dispatch) => {
    dispatch(cartStart());

    try {
        const response = await axios.get(`/api/shop/cart/get/${userId}`);
        dispatch(loadCartItems(response.data.cartItems));
        console.log("Cart items fetched successfully:", response.data.cartItems);

    } catch (error) {
        dispatch(cartFail(error.message));
        console.error("Error fetching cart items:", error);
    }
}
export const deleteCartItem = (userId, productId) => async (dispatch) => {
    console.log("Deleting from cart:", { userId, productId });
    dispatch(cartStart());
    try {
        const response = await axios.delete(`/api/shop/cart/delete/${userId}/${productId}`);
        dispatch(loadCartItems(response.data.cartItems));
        console.log("Cart item deleted successfully:", response.data.cartItems);

    } catch (error) {
        dispatch(cartFail(error.message));
        console.error("Error deleting cart item:", error);
    }
}

export const updateCartItemQty = (userId, productId, quantity) => async (dispatch) => {
    dispatch(cartStart());
    console.log("Updating cart item quantity:", { userId, productId, quantity });
    
    try {
        const response = await axios.put(
            `/api/shop/cart/update/${userId}/${productId}`,
            { quantity }
        );
        dispatch(loadCartItems(response.data.cartItems));
        console.log("Cart item quantity updated successfully:", response.data.cartItems);

    } catch (error) {
        dispatch(cartFail(error.message));
        console.error("Error updating cart item quantity:", error);
    }
}

