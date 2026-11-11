import { axiosInstance } from '../api/axiosInstance'

export async function registerUser(username, email, password, phone, gender, role) {
    const response = await axiosInstance.post(`/api/auth/register`, {
        Username: username,
        email,
        password,
        phone,
        gender: gender ? gender[0].toUpperCase() + gender.slice(1) : gender,
        role: role ? role[0].toUpperCase() + role.slice(1) : role
    })
    return response.data
}

export async function loginUser(email, password) {
    const response = await axiosInstance.post(`/api/auth/login`, {
        email,
        password
    })
    return response.data
}

export async function fetchCurrentUser() {
    const response = await axiosInstance.get(`/api/auth/me`)
    return response.data
}

export async function logoutUser() {
    const response = await axiosInstance.post(`/api/auth/logout`)
    return response.data
}