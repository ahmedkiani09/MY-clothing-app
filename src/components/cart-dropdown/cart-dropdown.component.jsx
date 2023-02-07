import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartDropdownContext } from "../../context/cart-dropdown.context";

import CartItem from "../cart-item/cart-item.component";
import Button from "./../button/button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItemsArray } = useContext(CartDropdownContext);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => navigate("/checkout");

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItemsArray.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </div>
  );
};
export default CartDropdown;
