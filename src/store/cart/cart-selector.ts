import { createSelector } from "reselect";
import { CartState } from "./cart-reducer";

const selectCartReducer = (state): CartState => {
  return state.cart;
};

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItemsArray
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);
