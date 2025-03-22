import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/products";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, getAuthHeader());
    toast.success("Product added successfully");
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("Failed to add product");
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, getAuthHeader());
    toast.success("Product updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Failed to update product");
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    toast.success("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Failed to delete product");
    throw error;
  }
};