import mongoose from "mongoose";

const InquierySchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Student is required"]
    },
    hostel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostel",
        required: [true, "Hostel is required"]
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Owner is required"]
    },
    message:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: ["Pending", "Resolved", "Rejected", "Available", "Booked"],
        default: "Pending"
    }
}, {timestamps: true})

const InquieryModel = new mongoose.model("inquiery", InquierySchema)

export default InquieryModel