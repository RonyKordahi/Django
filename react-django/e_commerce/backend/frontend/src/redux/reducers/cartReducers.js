import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD, CART_RESET } from "../constants/cartConstants"

// handles the cart
export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {

    switch (action.type) {

        case CART_ADD_ITEM:

            const item = action.payload;
            const itemExists = state.cartItems.find(cartItem => cartItem.product === item.product)

            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem => {

                        return cartItem.product === item.product ? item : cartItem;
                    })
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => {
                    return cartItem.product !== action.payload
                })
            }

        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_RESET:
            window.localStorage.removeItem("cartItems");
            return {cartItems: [], shippingAddress: {}}

        default:
            return state
    }
}