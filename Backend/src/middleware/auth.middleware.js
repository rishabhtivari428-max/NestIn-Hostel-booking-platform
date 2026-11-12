
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.model.js'

export async function identifyUser(req, res, next) {
    try {
        const token = req.cookies?.accessToken

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized access, no access token provided'
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        )

        const user = await UserModel
            .findById(decoded.userId)
            .select('-password -refreshToken')

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized access, user not found'
            })
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired access token'
        })
    }
}

export function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied: You do not have permission'
            })
        }

        next()
    }
}
