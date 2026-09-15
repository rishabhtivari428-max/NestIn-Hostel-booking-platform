import UserModel from "../models/User.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000 
};

export async function registerUser(req, res) {
    try {
        const { Username, email, password, phone, gender, role } = req.body;

        if (!Username || !email || !password || !phone || !gender || !role) {
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
            role
        });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        return res.status(201)
            .cookie("token", token, cookieOptions)
            .json({
                message: "User registered successfully",
                token,
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

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        return res.status(200)
            .cookie("token", token, cookieOptions)
            .json({
                message: "User logged in successfully",
                token,
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