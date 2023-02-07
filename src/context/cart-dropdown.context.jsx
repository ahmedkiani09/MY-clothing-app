import { createContext, useState } from "react";

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

export const CartDropdownProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsArray, setCartItems] = useState([]);

  const addItemsToCartArray = (productToAdd) => {
    return setCartItems(addItemToCartArrayHelper(cartItemsArray, productToAdd));
  };

  const removeItemsFromCartArray = (cartItemToRemove) => {
    return setCartItems(
      removeItemFromCartArrayHelper(cartItemsArray, cartItemToRemove)
    );
  };

  const clearItemsFromCartArray = (cartItemToClear) => {
    return setCartItems(
      clearItemsFromCartArrayHelper(cartItemsArray, cartItemToClear)
    );
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
