// import axios from "axios";
// import { toast } from "react-toastify";

// export const api = axios.create({
//   baseURL: "http://localhost:3001/api",
// });

// export const getAllServices = async () => {
//   try {
//     const response = await api.get("/services", {
//       timeout: 10 * 1000,
//     });

//     if (response.status === 400 || response.status === 500) {
//       throw response.data;
//     }
//     return response.data;
//   } catch (error) {
//     toast.error("Something went wrong");
//     throw error;
//   }
// };

// export const getService = async (id) => {
//   try {
//     const response = await api.get(`/services/${id}`, {
//       timeout: 10 * 1000,
//     });

//     if (response.status === 400 || response.status === 500) {
//       throw response.data;
//     }
//     return response.data;
//   } catch (error) {
//     toast.error("Something went wrong");
//     throw error;
//   }
// };
// export const getCategoryData = async () => {
//   try {
//     const response = await api.get('/categories'); 
//     return response.data; 
//   } catch (error) {
//     throw new Error('Error fetching categories:', error);
//   }
// };

// // Function to fetch subcategories data
// export const getSubcategoryData = async () => {
//   try {
//     const response = await api.get('/subcategories'); 
//     return response.data; 
//   } catch (error) {
//     throw new Error('Error fetching subcategories:', error);
//   }
// };

// export const getSubcatServices = async (subcategoryId) => {
//   try {
//     const response = await api.get(`/services/subcat/${subcategoryId}`, {
//       timeout: 10 * 1000,
//     });

//     if (response.status === 400 || response.status === 500) {
//       throw response.data;
//     }
//     return response.data;
//   } catch (error) {
//     toast.error("Something went wrong");
//     throw error;
//   }
// };
// export const fetchUserServicesCount = async (userId) => {
//   try {
//       const response = await api.get(`/user/services/count/${userId}`);
//       return response.data.count;
//   } catch (error) {
//       console.error('Error fetching user services count:', error);
//       throw new Error('Failed to fetch user services count');
//   }
// };

// utils/api.js

import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

const apiClient = axios.create({
  baseURL: "http://localhost:3005/api",
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
    const response = await apiClient.get(`/comments/service/${serviceId}`, { timeout: 10 * 1000 });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const addComment = async (serviceId, text) => {
  try {
    const response = await apiClient.post(`/comments/${serviceId}`, { text }, {
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
//good hada lcode d asmaa 
// import axios from "axios";
// import { toast } from "react-toastify";

// export const api = axios.create({
//   baseURL: "http://localhost:3001/api",
// });

// export const getAllServices = async () => {
//   try {
//     const response = await api.get("/services", {
//       timeout: 10 * 1000,
//     });

//     if (response.status === 400 || response.status === 500) {
//       throw response.data;
//     }
//     return response.data;
//   } catch (error) {
//     toast.error("Something went wrong");
//     throw error;
//   }
// };

// export const getService = async (id) => {
//   try {
//     const response = await api.get(`/services/${id}`, {
//       timeout: 10 * 1000,
//     });

//     if (response.status === 400 || response.status === 500) {
//       throw response.data;
//     }
//     return response.data;
//   } catch (error) {
//     toast.error("Something went wrong");
//     throw error;
//   }
// };
// export const getCategoryData = async () => {
//   try {
//     const response = await api.get('/categories'); 
//     return response.data; 
//   } catch (error) {
//     throw new Error('Error fetching categories:', error);
//   }
// };

// // Function to fetch subcategories data
// export const getSubcategoryData = async () => {
//   try {
//     const response = await api.get('/subcategories'); 
//     return response.data; 
//   } catch (error) {
//     throw new Error('Error fetching subcategories:', error);
//   }
// };

// export const getSubcatServices = async (subcategoryId) => {
//   try {
//     const response = await api.get(`/services/subcat/${subcategoryId}`, {
//       timeout: 10 * 1000,
//     });

//     if (response.status === 400 || response.status === 500) {
//       throw response.data;
//     }
//     return response.data;
//   } catch (error) {
//     toast.error("Something went wrong");
//     throw error;
//   }
// };
// export const fetchUserServicesCount = async (userId) => {
//   try {
//       const response = await api.get(`/user/services/count/${userId}`);
//       return response.data.count;
//   } catch (error) {
//       console.error('Error fetching user services count:', error);
//       throw new Error('Failed to fetch user services count');
//   }
// };
