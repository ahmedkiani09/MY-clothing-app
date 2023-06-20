import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart-selector";
import { addItemsToCartArray } from "../../store/cart/cart-actions";

import Button from "./../button/button.component";
import { BUTTON_TYPE_CLASSES } from "./../button/button.component";

import "./product-card.style.scss";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItemsArray = useSelector(selectCartItems);

  const { name, price, imageUrl } = product;

  const addProductsToCart = () =>
    dispatch(addItemsToCartArray(cartItemsArray, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductsToCart}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
