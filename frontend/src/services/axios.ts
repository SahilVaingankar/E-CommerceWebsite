import axios from "axios";

// Create the instance first
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5050",
  withCredentials: true, // makes sure cookies are sent
});

// Add the interceptor *after* creating the instance
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data?.message === "Unauthorised, Token expired"
    ) {
      console.log("calling refresh route");

      originalRequest._retry = true;
      try {
        // Call refresh route to get new access token (via cookies)
        await axiosInstance.post("/auth/refresh", null);
        return axiosInstance(originalRequest); // Retry the original request
      } catch (err) {
        return Promise.reject(err); // Refresh failed
      }
    }

    return Promise.reject(error); // Other errors
  }
);

// Export it correctly
export default axiosInstance;
