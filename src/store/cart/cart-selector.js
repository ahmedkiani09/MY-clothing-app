import { createSelector } from "reselect";

const selectCartReducer = (state) => {
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
