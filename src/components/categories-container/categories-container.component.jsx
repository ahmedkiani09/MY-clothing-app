import "./categories-container.style.scss";
import CategoryItem from "../category-item/category-item.component";

const CategoriesContainer = ({ categories }) => {
  return (
    <div className="all-categories-container">
      {categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default CategoriesContainer;
