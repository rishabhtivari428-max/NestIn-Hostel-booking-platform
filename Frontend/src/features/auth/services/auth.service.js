import { axiosInstance } from '../api/axiosInstance'

export async function registerUser(username, email, password, phone, gender, role){
    const response = await axiosInstance.post(`/auth/register`, {
        Username: username,
        email,
        password,
        phone,
        gender: gender ? gender[0].toUpperCase() + gender.slice(1) : gender,
        role: role ? role[0].toUpperCase() + role.slice(1) : role
    })
    if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data
}

export async function loginUser(email, password){
    const response = await axiosInstance.post(`/auth/login`, {
        email,
        password
    })
    if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data
}