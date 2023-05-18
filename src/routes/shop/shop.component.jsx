import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";

import { fetchCategoriesStart } from "../../store/categories/categories-action";

import CategoryPreviewRoute from "../categories-preview/categories-preview-route.component";
import CategoryPreviewFullRoute from "../category-preview-full/category-preview-full-route.component";

import "./shop.style.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoryPreviewRoute />} />
      <Route path=":category" element={<CategoryPreviewFullRoute />} />
    </Routes>
  );
};

export default Shop;
