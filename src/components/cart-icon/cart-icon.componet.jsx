import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartDropdownContext } from "../../context/cart-dropdown.context";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemsArray } =
    useContext(CartDropdownContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const quantity = () => {
    let totalQuantity = 0;
    cartItemsArray.forEach((cartItem) => (totalQuantity += cartItem.quantity));
    return totalQuantity;
  };

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{quantity()}</span>
    </div>
  );
};
export default CartIcon;
