import { HostelModel } from "../models/Hostel.model.js";

// 1. ADD HOSTEL
export async function addHostel(req, res) {
    try {
        let { name, city, address, pricePerMonth, amenities, roomType } = req.body;

        if (!name || !city || !address || !pricePerMonth || !amenities || !roomType) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (typeof amenities === 'string') {
            amenities = amenities.split(',').map(item => item.trim()).filter(Boolean);
        }

        if (!Array.isArray(amenities) || amenities.length === 0) {
            return res.status(400).json({
                message: "Amenities must be a non-empty array or string"
            });
        }

        const alreadyExists = await HostelModel.findOne({
            name: name.trim(),
            city: city.trim(),
            address: address.trim()
        });

        if (alreadyExists) {
            return res.status(409).json({
                message: "Hostel already exists"
            });
        }

        const hostel = await HostelModel.create({
            name: name.trim(),
            owner: req.user._id,
            city: city.trim(),
            address: address.trim(),
            pricePerMonth: Number(pricePerMonth),
            amenities,
            roomType
        });

        return res.status(201).json({
            message: "Hostel created successfully",
            hostel
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function getHostelById(req, res) {
    try {
        const { id } = req.params;

        const hostel = await HostelModel.findById(id).populate('owner', 'Username email phone');

        if (!hostel) {
            return res.status(404).json({ message: "Hostel not found" });
        }

        return res.status(200).json({
            message: "Hostel fetched successfully",
            hostel
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function getAllHostels(req, res) {
    try {
        const { city, maxPrice, roomType, search } = req.query;

        let filter = {};

        if (city) {
            filter.city = { $regex: city, $options: 'i' };
        }

        if (roomType) {
            filter.roomType = roomType;
        }

        if (maxPrice) {
            filter.pricePerMonth = { $lte: Number(maxPrice) };
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } }
            ];
        }

        const hostels = await HostelModel.find(filter).populate('owner', 'Username email phone');
        const hostelResults = hostels.map((hostel) => ({
            ...hostel.toObject(),
            id: hostel._id.toString()
        }));

        return res.status(200).json({
            success: true,
            count: hostelResults.length,
            hostels: hostelResults
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function getHostelbyOwner(req, res) {
    try {
        const ownerId = req.params.id || req.user._id;

        const hostels = await HostelModel.find({ owner: ownerId }).populate('owner', 'Username email phone');

        return res.status(200).json({
            message: "Hostels fetched successfully",
            count: hostels.length,
            hostels
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function deleteHostel(req, res) {
    try {
        const hostelId = req.params.id;

        const userId = req.user._id;
        const userRole = req.user.role;

        const hostel = await HostelModel.findById(hostelId);

        if (!hostel) {
            return res.status(404).json({
                message: "Hostel not found"
            });
        }

        const hostelOwnerId = hostel.owner || hostel.Owner;
        const isAdmin = userRole === 'Admin' || userRole === 'admin';

        if (isAdmin) {
            const delHostel = await HostelModel.findByIdAndDelete(hostelId);
            return res.status(200).json({
                message: "Hostel deleted successfully by Admin",
                delHostel
            });
        }

        if (!hostelOwnerId) {
            return res.status(400).json({
                message: "Hostel document has no owner assigned. Only Admin can delete this."
            });
        }

        if (hostelOwnerId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "Access denied. You are not authorized for this action"
            });
        }

        const delHostel = await HostelModel.findByIdAndDelete(hostelId);

        return res.status(200).json({
            message: "Hostel deleted successfully",
            delHostel
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}