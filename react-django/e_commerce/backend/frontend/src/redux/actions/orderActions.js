import axios from "axios";

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_USER_LIST_REQUEST,
    ORDER_USER_LIST_SUCCESS,
    ORDER_USER_LIST_FAIL,
    ORDER_USER_LIST_RESET,
    
    ORDER_ADMIN_LIST_REQUEST,
    ORDER_ADMIN_LIST_SUCCESS,
    ORDER_ADMIN_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { CART_RESET } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })

        // get the authorization token
        const { userLoginReducer: { userInfo: { token } } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
            config,
        );

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_RESET });
    }
    catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        // get the authorization token
        const { userLoginReducer: { userInfo: { token } } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const { data } = await axios.get(
            `/api/orders/${id}/`,
            config,
        );

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST })

        // get the authorization token
        const { userLoginReducer: { userInfo: { token } } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const { data } = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config,
        );

        // console.log(data);
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getUserOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_USER_LIST_REQUEST })

        // get the authorization token
        const { userLoginReducer: { userInfo: { token } } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const { data } = await axios.get(
            "/api/orders/myorders/",
            config,
        );

        dispatch({ type: ORDER_USER_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: ORDER_USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getAdminOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_ADMIN_LIST_REQUEST })

        // get the authorization token
        const { userLoginReducer: { userInfo: { token } } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const { data } = await axios.get(
            "/api/orders/",
            config,
        );

        dispatch({ type: ORDER_ADMIN_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: ORDER_ADMIN_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deliverOrder = (id, order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST })

        // get the authorization token
        const { userLoginReducer: { userInfo: { token } } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const { data } = await axios.put(
            `/api/orders/${id}/deliver/`,
            order,
            config,
        );

        // console.log(data);
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}