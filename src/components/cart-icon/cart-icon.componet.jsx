import "./cart-icon.styles.scss";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";

import { selectIsCartOpen } from "../../store/cart/cart-selector";
import { selectCartItems } from "../../store/cart/cart-selector";
import { setIsCartOpen } from "../../store/cart/cart-actions";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);

  const cartItemsArray = useSelector(selectCartItems);

  const toggleCart = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  const calcCount = () => {
    let totalQuantity = 0;
    cartItemsArray.forEach((cartItem) => (totalQuantity += cartItem.quantity));
    return totalQuantity;
  };

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{calcCount()}</span>
    </div>
  );
};
export default CartIcon;
