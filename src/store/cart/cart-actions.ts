import {
  ActionWithPayLoad,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart-types";
import { CategoryItem } from "../categories/categories-types";

const addItemToCartArrayHelper = (
  cartItemsArray: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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

const removeItemFromCartArrayHelper = (
  cartItemsArray: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  // 1(a). finding if the cartItems contains productToAdd:
  const existingCartItem = cartItemsArray.find(
    (item) => item.id === cartItemToRemove.id
  );

  // 2. if the quantity is 1 and if it is then remove the cart item:
  if (existingCartItem && existingCartItem.quantity === 1) {
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

const clearItemsFromCartArrayHelper = (
  cartItemsArray: CartItem[],
  cartItemToClear: CartItem
): CartItem[] => {
  return cartItemsArray.filter(
    (cartItem) => cartItem.id !== cartItemToClear.id
  );
};

export type SetIsCartOpen = ActionWithPayLoad<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayLoad<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
});

export const setCartItems = withMatcher(
  (cartItemsArray: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItemsArray);
  }
);

export const addItemsToCartArray = (
  cartItemsArray: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addItemToCartArrayHelper(cartItemsArray, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemsFromCartArray = (
  cartItemsArray: CartItem[],
  cartItemToRemove: CartItem
) => {
  const newCartItems = removeItemFromCartArrayHelper(
    cartItemsArray,
    cartItemToRemove
  );
  return setCartItems(newCartItems);
};

export const clearItemsFromCartArray = (
  cartItemsArray: CartItem[],
  cartItemToClear: CartItem
) => {
  const newCartItems = clearItemsFromCartArrayHelper(
    cartItemsArray,
    cartItemToClear
  );
  return setCartItems(newCartItems);
};
