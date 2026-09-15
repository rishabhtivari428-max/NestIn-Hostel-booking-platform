import { axiosInstance } from "../api/axiosInstance";

export async function addHostel({ name, city, address, pricePerMonth, amenities, roomType }){
    const response = await axiosInstance.post(`/hostels/addhostel`, {
        name,
        city, 
        address,
        pricePerMonth,
        amenities,
        roomType
    })
    return response.data
}

export async function getHostelById(id){
    const response = await axiosInstance.get(`/hostels/gethostel/${id}`)
    return response.data
}

export async function getAllHostels(){
    const response = await axiosInstance.get(`/hostels/getallhostels`)
    return response.data
}

export async function gethostelsbyOwner(id){
    const response = await axiosInstance.get(`/hostels/gethostelsbyOwner/${id}`)
    return response.data
}

export async function deleteHostel(id){
    const response = await axiosInstance.delete(`/hostels/deletehostel/${id}`)
    return response.data
}