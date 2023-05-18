import { Fragment } from "react";
import { useSelector } from "react-redux";

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories-selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.styles";

const CategoryPreviewRoute = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoryPreviewRoute;
