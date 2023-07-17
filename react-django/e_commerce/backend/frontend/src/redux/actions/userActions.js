import axios from "axios";

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_RESET,

    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,

    USER_UPDATE_REQUEST,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_RESET,

    USERS_LIST_REQUEST,
    USERS_LIST_FAIL,
    USERS_LIST_SUCCESS,
    USERS_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,

    USER_ADMIN_UPDATE_REQUEST,
    USER_ADMIN_UPDATE_FAIL,
    USER_ADMIN_UPDATE_SUCCESS,
    USER_ADMIN_UPDATE_RESET,
} from "../constants/userConstants";

import { ORDER_USER_LIST_RESET } from "../constants/orderConstants";

// login action
export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }

        const { data } = await axios.post("/api/users/login/", { username: email, password }, config);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        window.localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// logout action
export const logout = () => (dispatch) => {

    window.localStorage.removeItem("userInfo");

    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USERS_LIST_RESET });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_REGISTER_RESET })
    dispatch({ type: ORDER_USER_LIST_RESET });
}

// register action
export const register = (user) => async (dispatch) => {
    try {

        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }

        const { data } = await axios.post(
            "/api/users/register/",
            {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
            },
            config,
        );

        // register success
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

        // update the logged in info
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        window.localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// gets user profile details
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })

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
            `/api/users/${id}`,
            config,
        );

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// updates user profile
export const updateUser = (user) => async (dispatch, getState) => {
    try {

        dispatch({ type: USER_UPDATE_REQUEST })

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
            "/api/users/profile/update/",
            user,
            config,
        );

        // update success
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

        // update logged in info
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        window.localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// gets user profile details
export const getUsersList = () => async (dispatch, getState) => {
    try {

        dispatch({ type: USERS_LIST_REQUEST })

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
            `/api/users/`,
            config,
        );

        dispatch({ type: USERS_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: USERS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// gets user profile details
export const deleteUser = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: USER_DELETE_REQUEST })

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
            `/api/users/delete/${id}/`,
            config,
        );

        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// updates user profile
export const adminUpdateUser = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })

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
            `/api/users/update/${id}/`,
            user,
            config,
        );

        // update success
        dispatch({ type: USER_ADMIN_UPDATE_SUCCESS });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}