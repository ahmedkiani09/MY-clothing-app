import { Route, Routes } from "react-router-dom";

import CategoryPreviewRoute from "../categories-preview/categories-preview-route.component";
import CategoryPreviewFullRoute from "../category-preview-full/category-preview-full-route.component";

import "./shop.style.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoryPreviewRoute />} />
      <Route path=":category" element={<CategoryPreviewFullRoute />} />
    </Routes>
  );
};

export default Shop;
