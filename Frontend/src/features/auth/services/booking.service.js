import { axiosInstance } from '../api/axiosInstance'

export async function BookHostel({ hostelId, checkInDate, totalAmount }){
    const response = await axiosInstance.post(`/bookings/book/${hostelId}`, {
        checkInDate,
        price: totalAmount
    })
    return response.data
}

export async function getBooking(){
    const response = await axiosInstance.get(`/bookings/getbookings`)
    return response.data
}

export async function getSingleBooking(id){
    const response = await axiosInstance.get(`/bookings/getsinglebooking/${id}`)
    return response.data
}

export async function cancelbooking(id){
    const response = await axiosInstance.delete(`/bookings/cancelbooking/${id}`)
    return response.data
}

