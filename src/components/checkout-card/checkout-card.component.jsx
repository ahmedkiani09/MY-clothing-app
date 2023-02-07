import "./checkout-card.style.scss";

const CheckoutCard = ({
  checkoutItem,
  quantityIncreaseHandler,
  quantityDecreaseHandler,
  productRemoverHandler,
}) => {
  const increaseQuantity = () => quantityIncreaseHandler(checkoutItem);
  const decreaseQuantity = () => quantityDecreaseHandler(checkoutItem);
  const clearItem = () => productRemoverHandler(checkoutItem);

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
