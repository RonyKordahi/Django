import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderUserListReducer,
    orderAdminListReducer,
    orderDeliverReducer
} from "./reducers/orderReducers";
import {
    productsListReducer,
    productDetailsReducer,
    productTopRatedReducer,
    productAdminDeleteReducer,
    productAdminCreateReducer,
    productAdminUpdateReducer,
    productReviewCreateReducer,
} from "./reducers/productsReducers";
import {
    userLoginReducer,
    usersListReducer,
    userUpdateReducer,
    userDeleteReducer,
    userDetailsReducer,
    userRegisterReducer,
    userAdminUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
    // cart reducers
    cartReducer,

    // product reducers
    productsListReducer,
    productDetailsReducer,
    productTopRatedReducer,
    productAdminDeleteReducer,
    productAdminCreateReducer,
    productAdminUpdateReducer,
    productReviewCreateReducer,

    // order reducers
    orderPayReducer,
    orderCreateReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderUserListReducer,
    orderAdminListReducer,

    // user reducers
    usersListReducer,
    userLoginReducer,
    userUpdateReducer,
    userDeleteReducer,
    userDetailsReducer,
    userRegisterReducer,
    userAdminUpdateReducer,
});

// checks for stored values in localStorage to be used as initialState
const storedCart = window.localStorage.getItem("cartItems") ? JSON.parse(window.localStorage.getItem("cartItems")) : [];
const storedAddress = window.localStorage.getItem("shippingAddress") ? JSON.parse(window.localStorage.getItem("shippingAddress")) : {};
const storedUser = window.localStorage.getItem("userInfo") ? JSON.parse(window.localStorage.getItem("userInfo")) : null;

const initialState = {
    cartReducer: { cartItems: storedCart, shippingAddress: storedAddress },
    userLoginReducer: { userInfo: storedUser },
};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;