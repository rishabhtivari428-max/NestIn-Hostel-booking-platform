import UserModel from "../models/User.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateAcessToken, generateRefreshToken } from '../utils/generateToken.js'

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 3 * 24 * 60 * 60 * 1000
};

export async function registerUser(req, res) {
    try {
        const { Username, email, password, phone, gender, role } = req.body;

        if (!Username || !email || !gender || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const AlreadyExists = await UserModel.findOne({ email });

        if (AlreadyExists) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            Username,
            email,
            password: hashedPassword,
            phone,
            gender,
            role,
            authProvider: 'local'
        });

        const accessToken = generateAcessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save()

        return res.status(201)
            .cookie('accessToken', accessToken, {
                ...cookieOptions, maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({
                message: "User registered successfully",
                user: {
                    id: user._id,
                    Username: user.Username,
                    email: user.email,
                    role: user.role
                }
            });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const VerifiedPassword = await bcrypt.compare(password, user.password);

        if (!VerifiedPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const accessToken = generateAcessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save()

        return res.status(200)
            .cookie('accessToken', accessToken, {
                ...cookieOptions, maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({
                message: "User logged in successfully",
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function generateNewAccessToken(req, res) {
    try {
        const incomingRefreshToken = req.cookies.refreshToken

        if (!incomingRefreshToken) {
            return res.status(401).json({
                message: "Token not found"
            })
        }

        let decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }

        const user = await UserModel.findById(decoded.userId)

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        if (incomingRefreshToken !== user.refreshToken) {
            return res.status(401).json({
                message: "Refresh token is expired or has been revoked"
            })
        }

        const newAccessToken = generateAcessToken(user._id)

        return res.status(200)
            .cookie('accessToken', newAccessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000
            })
            .json({
                message: "Access Token generated successfully"
            })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in Generate Token",
            error: error.message
        })
    }
}

export async function getCurrentUser(req, res) {
    try {
        const user = await UserModel.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            user: {
                id: user._id,
                Username: user.Username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export async function logoutUser(req, res) {
    try {
        if (req.user) {
            await UserModel.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
        }

        res.clearCookie('accessToken', cookieOptions);
        res.clearCookie('refreshToken', cookieOptions);

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error during logout",
            error: error.message
        });
    }
}

export const googleAuthCallback = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
            return res.redirect(`${frontendURL}/login?error=GoogleAuthFailed`);
        }

        const accessToken = generateAcessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        const frontendURL = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/+$/, '');

        return res
            .cookie('accessToken', accessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .redirect(`${frontendURL}/`);
    } catch (error) {
        console.error("Error in googleAuthCallback:", error);
        const frontendURL = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/+$/, '');
        return res.redirect(`${frontendURL}/login?error=ServerError`);
    }
};