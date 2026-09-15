import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostel",
        required: [true, "Hostel ID is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "User ID is required"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Owner ID is required"]
    },
    checkInDate: {
        type: Date,
        required: [true, "checkIn date is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    status: {
        type: String,
        enum: ["Pending", "Booked", "Cancelled", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true });

const BookingModel = mongoose.models.bookings || mongoose.model('bookings', BookingSchema);

export default BookingModel;