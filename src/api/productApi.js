import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const getProducts = () => axios.get(API_URL);

export const createProduct = (product) => axios.post(API_URL, product);

export const deleteProductAPI = (id) => axios.delete(`${API_URL}/${id}`);
