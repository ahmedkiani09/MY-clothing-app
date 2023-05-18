import { CART_ACTION_TYPES } from "./cart-types";

export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItemsArray: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  // ! Reducers only store readable values meaning no functions and other similar types can be included in the reducers.
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItemsArray: payload,
      };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      return { ...state };
  }
};
