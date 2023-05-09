// import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import Button from "./../button/button.component";

import { selectCartItems } from "../../store/cart/cart-selector";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.jsx";
import { useSelector } from "react-redux";

const CartDropdown = () => {
  const { cartItemsArray } = useSelector(selectCartItems);

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
