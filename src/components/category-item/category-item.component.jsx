import { useNavigate } from "react-router-dom";
import "./category-item.style.scss";

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`shop/${category.title}`);
  };

  const { imageUrl, title } = category;
  return (
    <div className="category-container" onClick={clickHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="inner-img-container">
        <h2>{title}</h2>
        <p> Shop Now </p>
      </div>
    </div>
  );
};

export default CategoryItem;
