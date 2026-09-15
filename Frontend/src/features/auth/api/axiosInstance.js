import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://nestin-hostel-booking-platform.onrender.com/api";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);