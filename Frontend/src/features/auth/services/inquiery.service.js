import { axiosInstance } from '../api/axiosInstance'

export async function createInquiery(id, message) {
    let hostelId = id;
    let msg = message;
    if (typeof id === 'object' && id !== null) {
        hostelId = id.hostelId || id.id;
        msg = id.message;
    }
    const response = await axiosInstance.post(`/inquiery/createInq/${hostelId}`, {
        message: msg
    })
    return response.data
}

export async function getInquiery(id) {
    const url = id ? `/inquiery/getInq/${id}` : `/inquiery/getInq`
    const response = await axiosInstance.get(url)
    return response.data
}

export async function updateInquieryStatus(id, status) {
    const response = await axiosInstance.patch(`/inquiery/updateStatus/${id}`, { status })
    return response.data
}

export async function deleteInquiery(id) {
    const response = await axiosInstance.delete(`/inquiery/deleteInq/${id}`)
    return response.data
}