import { createContext, useReducer } from "react";

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

export const CartDropdownContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItemsArray: [],
  addItemsToCartArray: () => {},
  removeItemsFromCartArray: () => {},
  clearItemsFromCartArray: () => {},
});

//  ! Initialize the state of the cart:
const INITIAL_STATE = {
  isCartOpen: false,
  cartItemsArray: [],
};

const ACTION_CASES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

// ! cart Reducer function:
const cartReducer = (state, action) => {
  const { type, payLoad } = action;

  switch (type) {
    case ACTION_CASES.SET_CART_ITEMS:
      return {
        ...state,
        payLoad,
      };

    case ACTION_CASES.IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payLoad,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer `);
  }
};

export const CartDropdownProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItemsArray, isCartOpen } = state;

  const addItemsToCartArray = (productToAdd) => {
    const newCartItems = addItemToCartArrayHelper(cartItemsArray, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemsFromCartArray = (cartItemToRemove) => {
    const newCartItems = removeItemFromCartArrayHelper(
      cartItemsArray,
      cartItemToRemove
    );
    updateCartItemsReducer(newCartItems);
  };

  const clearItemsFromCartArray = (cartItemToClear) => {
    const newCartItems = clearItemsFromCartArrayHelper(
      cartItemsArray,
      cartItemToClear
    );
    updateCartItemsReducer(newCartItems);
  };

  // ! update cart item reducer functions:
  const updateCartItemsReducer = (newCartItems) => {
    dispatch({
      type: ACTION_CASES.SET_CART_ITEMS,
      payload: { cartItemsArray: newCartItems },
    });
  };

  const setIsCartOpen = (boolean) => {
    dispatch({ type: ACTION_CASES.SET_IS_CART_OPEN, payload: boolean });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemsToCartArray,
    removeItemsFromCartArray,
    clearItemsFromCartArray,
    cartItemsArray,
  };

  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};
