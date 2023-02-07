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

export const CartDropdownContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItemsArray: [],
  addItemsToCartArray: () => {},
});

export const CartDropdownProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsArray, setCartItems] = useState([]);

  const addItemsToCartArray = (productToAdd) => {
    setCartItems(addItemToCartArrayHelper(cartItemsArray, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemsToCartArray,
    cartItemsArray,
  };

  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};
