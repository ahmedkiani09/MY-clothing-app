import "./checkout-card.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart-selector.js";

import { addItemsToCartArray } from "../../store/cart/cart-actions.js";
import { removeItemsFromCartArray } from "../../store/cart/cart-actions.js";
import { clearItemsFromCartArray } from "../../store/cart/cart-actions.js";

const CheckoutCard = ({ checkoutItem }) => {
  const dispatch = useDispatch();
  const cartItemsArray = useSelector(selectCartItems);

  const increaseQuantity = () =>
    dispatch(addItemsToCartArray(cartItemsArray, checkoutItem));

  const decreaseQuantity = () =>
    dispatch(removeItemsFromCartArray(cartItemsArray, checkoutItem));

  const clearItem = () =>
    dispatch(clearItemsFromCartArray(cartItemsArray, checkoutItem));

  const { name, quantity, price, imageUrl } = checkoutItem;

  return (
    <div className="checkout-card-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>

      <span className="name">{name}</span>

      <span className="quantity">
        <div className="arrow" onClick={decreaseQuantity}>
          &#10094;
        </div>

        <span className="value">{quantity} </span>

        <div className="arrow" onClick={increaseQuantity}>
          &#10095;
        </div>
      </span>

      <span className="price">${price * quantity} </span>
      <div className="remove-button" onClick={clearItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutCard;
