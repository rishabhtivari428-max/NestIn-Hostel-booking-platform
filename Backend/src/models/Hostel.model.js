import mongoose from 'mongoose';

const HostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hostel name is required"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    },
    pricePerMonth: {
        type: Number, 
        required: [true, "Price per month is required"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    amenities: {
        type: [String], 
        default: []
    },
    roomType: {
        type: String,
        required: [true, "Room type is required"]
    }
}, { timestamps: true });

export const HostelModel = mongoose.models.hostel || mongoose.model("hostel", HostelSchema);