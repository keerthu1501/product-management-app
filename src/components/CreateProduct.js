import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProductAPI } from "../redux/productSlice";
import "./CreateProduct.css";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  // Handle text inputs
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      id: Date.now(), // local fake id
      price: Number(product.price),
    };

    dispatch(createProductAPI(newProduct));
    alert("Product added successfully!");

    setProduct({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setPreview(null);
  };

  return (
    <form className="create-product-form" onSubmit={handleSubmit}>
      <h2>Create Product</h2>

      <input
        name="title"
        placeholder="Title"
        value={product.title}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={product.price}
        onChange={handleChange}
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        required
      />

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="image-preview"
        />
      )}

      <button type="submit">Add Product</button>
    </form>
  );
};

export default CreateProduct;
