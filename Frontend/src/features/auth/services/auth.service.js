
import { axiosInstance } from '../api/axiosInstance'

export async function registerUser(username, email, password, phone, gender) {
    const response = await axiosInstance.post('/auth/register', {
        Username: username,
        email,
        password,
        phone,
        gender: gender
            ? gender[0].toUpperCase() + gender.slice(1)
            : gender
    })

    return response.data
}

export async function loginUser(email, password) {
    const response = await axiosInstance.post('/auth/login', {
        email,
        password
    })

    return response.data
}

export async function fetchCurrentUser() {
    const response = await axiosInstance.get('/auth/me')
    return response.data
}

export async function logoutUser() {
    const response = await axiosInstance.post('/auth/logout')
    return response.data
}
