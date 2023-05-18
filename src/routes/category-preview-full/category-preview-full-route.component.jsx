import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.styles";

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories-selector";

import "./category-preview-full-route.style.scss";

const CategoryPreviewFullRoute = () => {
  const { category } = useParams();
  const isLoading = useSelector(selectCategoriesIsLoading);
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <Fragment>
      <h2 className="category-full-title"> {category.toUpperCase()}</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="category-full-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default CategoryPreviewFullRoute;
