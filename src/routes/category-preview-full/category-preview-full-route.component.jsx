import { async } from "@firebase/util";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";

import { selectCategoriesMap } from "../../store/categories/categories-selector";

import "./category-preview-full-route.style.scss";

const CategoryPreviewFullRoute = () => {
  const { category } = useParams();
  // console.log("render/re-rendering of the category preview");
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // console.log("Effect fired setting products or calling setProducts");
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <Fragment>
      <h2 className="category-full-title"> {category.toUpperCase()}</h2>
      <div className="category-full-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default CategoryPreviewFullRoute;
