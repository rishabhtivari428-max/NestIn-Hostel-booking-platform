import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://nestin-hostel-booking-platform.onrender.com/api";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true 
});