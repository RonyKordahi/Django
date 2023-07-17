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

// handles information requests for all products
export const productsListReducer = (state = { products: [] }, action) => {

    switch (action.type) {

        case PRODUCTS_LIST_REQUEST:
            return {
                loading: true,
                products: [],
            }

        case PRODUCTS_LIST_SUCCESS:
            return {
                loading: false,
                page: action.payload.page,
                pages: action.payload.pages,
                products: action.payload.products,
            }

        case PRODUCTS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

// handles information requests for a single product
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {

    switch (action.type) {

        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }

        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

export const productAdminDeleteReducer = (state = {}, action) => {

    switch (action.type) {

        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true,
            }

        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

export const productAdminCreateReducer = (state = {}, action) => {

    switch (action.type) {

        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true,
            }

        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload,
            }

        case PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const productAdminUpdateReducer = (state = { product: {} }, action) => {

    switch (action.type) {

        case PRODUCT_UPDATE_REQUEST:
            return {
                loading: true,
            }

        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload,
            }

        case PRODUCT_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case PRODUCT_UPDATE_RESET:
            return {
                product: {}
            }

        default:
            return state
    }
}

export const productReviewCreateReducer = (state = { product: {} }, action) => {

    switch (action.type) {

        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true,
            }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {

    switch (action.type) {

        case PRODUCT_TOP_REQUEST:
            return {
                loading: true,
                products : [],
            }

        case PRODUCT_TOP_SUCCESS:
            return {
                loading: false,
                products : action.payload,
            }

        case PRODUCT_TOP_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}