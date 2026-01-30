import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector(state => state.products.products.find(p => p.id === Number(id)));

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="product-details">
        <img src={product.image} alt={product.title} />
        <div className="details">
          <h2>{product.title}</h2>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
          <p>Rating: {product.rating?.rate || 0} / 5 ({product.rating?.count || 0} reviews)</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
