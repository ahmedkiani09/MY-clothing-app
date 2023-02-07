import "./checkout.styles.scss";
import CheckoutCard from "../../components/checkout-card/checkout-card.component";
import { useContext } from "react";
import { CartDropdownContext } from "../../context/cart-dropdown.context";

const Checkout = () => {
  const {
    cartItemsArray,
    addItemsToCartArray,
    removeItemsFromCartArray,
    clearItemsFromCartArray,
  } = useContext(CartDropdownContext);

  const calcTotal = () => {
    let total = 0;
    cartItemsArray.forEach(
      (cartItem) => (total += cartItem.price * cartItem.quantity)
    );
    return total;
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span> Product</span>
        </div>
        <div className="header-block">
          <span> Description</span>
        </div>
        <div className="header-block">
          <span> Quantity</span>
        </div>
        <div className="header-block">
          <span> Price</span>
        </div>
        <div className="header-block">
          <span> Remove</span>
        </div>
      </div>

      {cartItemsArray.map((cartItem) => {
        return (
          <CheckoutCard
            key={cartItem.id}
            checkoutItem={cartItem}
            quantityIncreaseHandler={addItemsToCartArray}
            quantityDecreaseHandler={removeItemsFromCartArray}
            productRemoverHandler={clearItemsFromCartArray}
          />
        );
      })}
      <span className="total"> Total: ${calcTotal()}</span>
    </div>
  );
};
export default Checkout;
