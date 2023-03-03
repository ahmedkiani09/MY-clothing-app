import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartDropdownContext } from "../../context/cart-dropdown.context";

import CartItem from "../cart-item/cart-item.component";
import Button from "./../button/button.component";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const { cartItemsArray } = useContext(CartDropdownContext);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => navigate("/checkout");

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItemsArray.length > 0 ? (
          cartItemsArray.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMessage> your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </CartDropdownContainer>
  );
};
export default CartDropdown;
