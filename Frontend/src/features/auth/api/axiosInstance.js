import axios from 'axios'

// Base URL is just the host — all paths in auth.service.js include /api/auth/...
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://nestin-hostel-booking-platform.onrender.com";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});