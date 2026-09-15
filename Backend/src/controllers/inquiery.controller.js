import InquieryModel from "../models/Inquiery.model.js";
import { HostelModel } from "../models/Hostel.model.js"; 

export async function createInquiery(req, res) {
    try {
        const { message } = req.body;
        const studentId = req.user._id;
        const hostelId = req.params.id;

        if (!message) {
            return res.status(400).json({
                message: "Message is required",
            });
        }

        const hostel = await HostelModel.findById(hostelId);
        if (!hostel) {
            return res.status(404).json({
                message: "Hostel not found",
            });
        }

        const alreadyInquired = await InquieryModel.findOne({
            student: studentId,
            hostel: hostelId,
        });

        if (alreadyInquired) {
            return res.status(409).json({
                message: "You have already inquired for this hostel",
                inquiry: alreadyInquired,
            });
        }

        const newInquiry = await InquieryModel.create({
            student: studentId,
            hostel: hostelId,
            owner: hostel.owner,
            message: message,
        });

        return res.status(201).json({
            message: "Inquiry submitted successfully",
            inquiry: newInquiry,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
            error: error.message,
        });
    }
}

export async function getInquiery(req, res) {
    try {
        const userId = req.user._id;
        const role = req.user.role;
        const hostelId = req.params.id;

        let query = {};

        if (role === "Owner") {
            query.owner = userId;
        } else {
            query.student = userId;
        }

        if (hostelId && hostelId !== "undefined" && hostelId !== "all") {
            query.hostel = hostelId;
        }

        const inquiries = await InquieryModel.find(query)
            .populate("hostel", "name location city address")
            .populate("student", "name email")
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Inquiries fetched successfully",
            inquiries: inquiries || [],
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export async function updateInquieryStatus(req, res) {
    try {
        const inquiryId = req.params.id;
        const { status } = req.body;

        const validStatuses = ["Pending", "Resolved", "Rejected", "Available", "Booked"];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
            });
        }

        const inquiry = await InquieryModel.findById(inquiryId);
        if (!inquiry) {
            return res.status(404).json({
                message: "Inquiry not found",
            });
        }

        // Verify authorization: logged in user must be the owner or student associated with inquiry
        const userIdStr = req.user._id.toString();
        if (inquiry.owner.toString() !== userIdStr && inquiry.student.toString() !== userIdStr) {
            return res.status(403).json({
                message: "Not authorized to update this inquiry",
            });
        }

        inquiry.status = status;
        await inquiry.save();

        const updatedInquiry = await InquieryModel.findById(inquiryId)
            .populate("hostel", "name location city address")
            .populate("student", "name email")
            .populate("owner", "name email");

        return res.status(200).json({
            message: "Inquiry status updated successfully",
            inquiry: updatedInquiry,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export async function deleteInquiery(req, res) {
    try {
        const inquiryId = req.params.id;

        const deletedInquiry = await InquieryModel.findByIdAndDelete(inquiryId);

        if (!deletedInquiry) {
            return res.status(404).json({
                message: "Inquiry not found or already deleted",
            });
        }

        return res.status(200).json({
            message: "Inquiry deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}