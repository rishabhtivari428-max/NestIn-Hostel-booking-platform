import express from 'express'
const authRouter = express.Router()
import { registerUser, loginUser, googleAuthCallback, generateNewAccessToken, getCurrentUser, logoutUser } from '../controllers/auth.controller.js'
import { identifyUser } from '../middleware/auth.middleware.js'
import passport from 'passport'

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

authRouter.get('/me', identifyUser, getCurrentUser)

authRouter.post('/logout', identifyUser, logoutUser)

authRouter.post('/refresh-token', generateNewAccessToken)

authRouter.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=GoogleAuthFailed`
    }),
    googleAuthCallback
);

export default authRouter
