import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getAllServices = async () => {
  try {
    const response = await api.get("/services", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getService = async (id) => {
  try {
    const response = await api.get(`/services/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const getCategoryData = async () => {
  try {
    const response = await api.get('/categories'); 
    return response.data; 
  } catch (error) {
    throw new Error('Error fetching categories:', error);
  }
};

// Function to fetch subcategories data
export const getSubcategoryData = async () => {
  try {
    const response = await api.get('/subcategories'); 
    return response.data; 
  } catch (error) {
    throw new Error('Error fetching subcategories:', error);
  }
};

export const getSubcatServices = async (subcategoryId) => {
  try {
    const response = await api.get(`/services/subcat/${subcategoryId}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
