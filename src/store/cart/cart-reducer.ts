import { AnyAction } from "redux";
import { CartItem } from "./cart-types";
import { setCartItems, setIsCartOpen } from "./cart-actions";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItemsArray: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItemsArray: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  // ! Reducers only store readable values meaning no functions and other similar types can be included in the reducers.
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItemsArray: action.payload,
    };
  }
  return { ...state };

  // switch (action.type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  //     return {
  //       ...state,
  //       cartItemsArray: action.payload,
  //     };
  //   case CART_ACTION_TYPES.SET_IS_CART_OPEN:
  //     return {
  //       ...state,
  //       isCartOpen: action.payload,
  //     };
  //   default:
  //     return { ...state };
  // }
};
