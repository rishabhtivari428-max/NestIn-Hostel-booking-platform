import jwt from 'jsonwebtoken'
import UserModel from '../models/User.model.js'

export async function identifyUser(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access, no token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid or expired token"
            })
        }
        
        const user = await UserModel.findById(decoded.id).select('-password')

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized access, user not found"
            })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: error.message
        })
    }
}

export function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied: You do not have permission to perform this action"
            })
        }
        next()
    }
}