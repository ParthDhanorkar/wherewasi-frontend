// import axios from "axios";
// const api = axios.create({
//   baseURL: "http://localhost:8081/api/v1", // your backend URL
// });
// export default api;




// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL, // your backend URL
});

// Add interceptor to include token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
