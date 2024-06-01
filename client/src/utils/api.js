
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});


const handleResponse = (response) => {
  if (response.status === 400 || response.status === 500) {
    throw response.data;
  }
  return response.data;
};

const handleError = (error) => {
  toast.error("Something went wrong");
  throw error;
};

export const getAllServices = async () => {
  try {
    const response = await api.get("/services", { timeout: 10 * 1000 });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getService = async (id) => {
  try {
    const response = await api.get(`/services/${id}`, { timeout: 10 * 1000 });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getCommentsByServiceId = async (serviceId) => {
  try {
    const response = await api.get(`/comments/service/${serviceId}`, { timeout: 10 * 1000 });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const addComment = async (serviceId, text) => {
  try {
    const response = await api.post(`/comments/${serviceId}`, { text }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    toast.error("Failed to add comment");
    throw error;
  }
};

export const getCategoryData = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching categories:", error);
  }
};

export const getSubcategoryData = async () => {
  try {
    const response = await api.get("/subcategories");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching subcategories:", error);
  }
};

export const getSubcatServices = async (subcategoryId) => {
  try {
    const response = await api.get(`/services/subcat/${subcategoryId}`, { timeout: 10 * 1000 });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const fetchUserServicesCount = async (userId) => {
  try {
    const response = await api.get(`/user/services/count/${userId}`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user services count:', error);
    throw new Error('Failed to fetch user services count');
  }
};


export const fetchUserdemandeCount = async (userId) => {
  try {
    const response = await api.get(`demande/user/demande/count/${userId}`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user demandes count:', error);
    throw new Error('Failed to fetch user demandes count');
  }
};

