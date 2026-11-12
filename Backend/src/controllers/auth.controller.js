import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

const useSecureCookies =
  process.env.NODE_ENV === "production" ||
  process.env.FRONTEND_URL?.startsWith("https://");

const cookieOptions = {
  httpOnly: true,
  secure: useSecureCookies,
  sameSite: useSecureCookies ? "none" : "lax",
  maxAge: 3 * 24 * 60 * 60 * 1000,
};

export async function registerUser(req, res) {
  try {
    const { Username, email, password, phone, gender } = req.body;

    if (!Username || !email || !password || !phone || !gender) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const AlreadyExists = await UserModel.findOne({ email });

    if (AlreadyExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      Username,
      email,
      password: hashedPassword,
      phone,
      gender,
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .status(201)
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User registered successfully",
        user: {
          id: user._id,
          Username: user.Username,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (!user.password) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const VerifiedPassword = await bcrypt.compare(password, user.password);

    if (!VerifiedPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User logged in successfully",
        user: {
          id: user._id,
          Username: user.Username,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


export async function generateNewAccessToken(req, res) {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token not found"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await UserModel.findById(decoded.userId);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Invalid or revoked refresh token"
            });
        }

        const newAccessToken = generateAccessToken(user._id);

        return res
            .cookie("accessToken", newAccessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000
            })
            .status(200)
            .json({
                message: "Access token generated successfully"
            });

    } catch (error) {
        if (error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid or expired refresh token"
            });
        }

        console.error("Error while generating access token:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export async function getCurrentUser(req, res) {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      user: {
        id: user._id,
        Username: user.Username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


export async function logoutUser(req, res) {
    try {
        const user = await UserModel.findById(req.user._id);

        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        return res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error during logout"
        });
    }
}

export const googleAuthCallback = async (req, res) => {
    const frontendURL = (
        process.env.FRONTEND_URL || "http://localhost:5173"
    ).replace(/\/+$/, "");

    try {
        const user = req.user;

        if (!user) {
            return res.redirect(
                `${frontendURL}/login?error=GoogleAuthFailed`
            );
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        return res
            .cookie("accessToken", accessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .redirect(`${frontendURL}/`);
            
    } catch (error) {
        console.error("Error in Google OAuth callback:", error);

        return res.redirect(
            `${frontendURL}/login?error=ServerError`
        );
    }
};
