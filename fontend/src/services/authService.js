import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data) {
      toast.success("Logged in Successfully");
      return response.data;
    }
  } catch (err) {
    if (err.response) {
      toast.error("Error: " + err.response.data.message);
    }
    throw err;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("token");
    toast.success("Logout successfully");
  } catch (error) {
    toast.error("Error: " + error);
    throw error;
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    if (response.data) {
      toast.success("Signup Successfully");
      return response.data;
    }
  } catch (err) {
    if (err.response) {
      toast.error("Error: " + err.response.data.message);
    }
    throw err;
  }
};