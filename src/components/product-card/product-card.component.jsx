import { useContext } from "react";

import Button from "./../button/button.component";
import { CartDropdownContext } from "../../context/cart-dropdown.context";

import "./product-card.style.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemsToCartArray } = useContext(CartDropdownContext);

  const addProductsToCart = () => addItemsToCartArray(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductsToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
