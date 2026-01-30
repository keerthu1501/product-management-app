import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} onClick={() => navigate(`/product/${product.id}`)} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
};

export default ProductCard;
