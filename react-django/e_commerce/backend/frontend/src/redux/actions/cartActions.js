import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD } from "../constants/cartConstants"

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);
        
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })

        // gets the latest cartItems array from state and stores it
        window.localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems));
    }
    catch (error) {
        dispatch({
            type: "CART_FAIL",
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });

    // gets the latest cartItems array from state and stores it
    window.localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems))
}

export const saveShippingAddress = (formData) => (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: formData });
    window.localStorage.setItem("shippingAddress", JSON.stringify(formData))
}

export const savePaymentMethod = (payment) => (dispatch) => {
    dispatch({type: SAVE_PAYMENT_METHOD, payload: payment});
    window.localStorage.setItem("paymentMethod", JSON.stringify(payment))
}