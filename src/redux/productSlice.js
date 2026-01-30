import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products from API using fetch
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  }
);

// Create product using fetch (local addition)
export const createProductAPI = createAsyncThunk(
  "products/createProductAPI",
  async (product) => {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    return data;
  }
);

// Delete product using fetch (local deletion)
export const deleteProductAPI = createAsyncThunk(
  "products/deleteProductAPI",
  async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return id; // Return id to remove locally
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProductLocal: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(createProductAPI.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProductAPI.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  },
});

export const { addProduct, deleteProductLocal } = productSlice.actions;
export default productSlice.reducer;
