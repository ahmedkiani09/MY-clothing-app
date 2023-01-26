import "./category-item.style.scss";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="category-container">
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
