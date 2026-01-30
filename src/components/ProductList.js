import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProductAPI } from "../redux/productSlice";
import ProductCard from "./ProductCard";
import CreateProduct from "./CreateProduct";
import Navbar from "./Navbar";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProductAPI(id)); // delete via fetch API
  };

  return (
    <>
      <Navbar />
      <div className="product-page">
        <CreateProduct />
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
