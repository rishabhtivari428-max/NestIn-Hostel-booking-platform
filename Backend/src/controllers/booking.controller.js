import BookingModel from '../models/Booking.model.js';
import { HostelModel } from '../models/Hostel.model.js'; 

export async function BookHostel(req, res) {
    try {
        const { checkInDate, price } = req.body;

        if (!checkInDate || !price) {
            return res.status(400).json({
                message: "checkInDate and price are required"
            });
        }

        const hostelId = req.params.id;
        const userId = req.user._id;

        const hostel = await HostelModel.findById(hostelId);
        if (!hostel) {
            return res.status(404).json({
                message: "Hostel not found"
            });
        }

        const ownerId = hostel.owner || hostel.Owner;

        const AlreadyBooked = await BookingModel.findOne({
            hostel: hostelId,
            user: userId,
            status: { $in: ["Pending", "Booked"] }
        });

        if (AlreadyBooked) {
            return res.status(409).json({
                message: "You have already requested/booked this hostel"
            });
        }

        const booking = await BookingModel.create({
            checkInDate,
            price,
            hostel: hostelId,
            user: userId,
            owner: ownerId
        });

        return res.status(201).json({
            message: "Hostel booking request sent successfully",
            booking
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function getSingleBooking(req, res) {
    try {
        const bookingId = req.params.id;
        const userId = req.user._id;

        const booking = await BookingModel.findOne({ _id: bookingId, user: userId })
            .populate('hostel')
            .populate('owner', 'name email phone'); 

        if (!booking) {
            return res.status(404).json({
                message: "Booking details not found or unauthorized"
            });
        }

        return res.status(200).json({
            message: "Booking details fetched successfully",
            booking
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function getBooking(req, res) {
    try {
        const userId = req.user._id;

        const myBookings = await BookingModel.find({ user: userId }).populate('hostel');

        if (!myBookings || myBookings.length === 0) {
            return res.status(404).json({
                message: "You haven't booked any hostel yet!"
            });
        }

        return res.status(200).json({
            message: "Hostel Bookings fetched successfully",
            myBookings
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function CancelBooking(req, res) {
    try {
        const bookingId = req.params.id;
        const userId = req.user._id;

        const booking = await BookingModel.findOne({ _id: bookingId, user: userId });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found or you are not authorized to cancel this booking"
            });
        }

        booking.status = "Cancelled";
        await booking.save();

        return res.status(200).json({
            message: "Hostel booking cancelled successfully",
            booking
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}