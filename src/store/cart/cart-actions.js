import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart-types";

const addItemToCartArrayHelper = (cartItemsArray, productToAdd) => {
  // 1(a). finding if the cartItems contains productToAdd:
  const existingCartItem = cartItemsArray.find(
    (item) => item.id === productToAdd.id
  );
  // 1(b). if found incrementing the quantity:
  if (existingCartItem) {
    return cartItemsArray.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // 2. otherwise return new array with new cartItems:
  return [...cartItemsArray, { ...productToAdd, quantity: 1 }];
};

const removeItemFromCartArrayHelper = (cartItemsArray, cartItemToRemove) => {
  // 1(a). finding if the cartItems contains productToAdd:
  const existingCartItem = cartItemsArray.find(
    (item) => item.id === cartItemToRemove.id
  );

  // 2. if the quantity is 1 and if it is then remove the cart item:
  if (existingCartItem.quantity === 1) {
    return cartItemsArray.filter(
      (cartItem) => cartItem.id !== cartItemToRemove.id
    );
  }

  // 1(b). if found decremnting the quantity:
  return cartItemsArray.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearItemsFromCartArrayHelper = (cartItemsArray, cartItemToClear) => {
  return cartItemsArray.filter(
    (cartItem) => cartItem.id !== cartItemToClear.id
  );
};

export const setIsCartOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
};

export const addItemsToCartArray = (cartItemsArray, productToAdd) => {
  const newCartItems = addItemToCartArrayHelper(cartItemsArray, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemsFromCartArray = (cartItemsArray, cartItemToRemove) => {
  const newCartItems = removeItemFromCartArrayHelper(
    cartItemsArray,
    cartItemToRemove
  );
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemsFromCartArray = (cartItemsArray, cartItemToClear) => {
  const newCartItems = clearItemsFromCartArrayHelper(
    cartItemsArray,
    cartItemToClear
  );
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
