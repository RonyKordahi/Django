import axios from "axios";

import {
    // all products
    PRODUCTS_LIST_FAIL,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,

    // single product
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,

    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,

    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,

    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,

    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,

    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
} from "../constants/productConstants";

// () => async (dispatch) => {} comes from the thunk package
// required for doing async actions (like fetch / axios)

export const listProducts = (keyword = "") => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_LIST_REQUEST })

        const { data } = await axios.get(`/api/products${keyword}`)

        dispatch({
            type: PRODUCTS_LIST_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const adminDeleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        // get the authorization token
        const { userLoginReducer: { userInfo: { token } } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config,
        );

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const adminCreateProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

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
            `/api/products/create/`,
            {},
            config,
        );

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const adminUpdateProduct = (id, product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        // get the authorization token
        const { userLoginReducer: { userInfo: { token } } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        // a body is required when doing a post, even if not sending information
        const { data } = await axios.put(
            `/api/products/update/${id}/`,
            product,
            config,
        );

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }
    catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProductReview = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        // get the authorization token
        const { userLoginReducer: { userInfo: { token } } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        // a body is required when doing a post, even if not sending information
        const { data } = await axios.post(
            `/api/products/review/${id}/`,
            review,
            config,
        );

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get("/api/products/top")

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}