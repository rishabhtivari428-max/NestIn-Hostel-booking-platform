import express from 'express'
const authRouter = express.Router()
import passport from '../config/passport.js'
import { registerUser, googleAuthCallback, loginUser, generateNewAccessToken, getCurrentUser, logoutUser } from '../controllers/auth.controller.js'
import { identifyUser } from '../middleware/auth.middleware.js'

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', identifyUser, logoutUser)
authRouter.post('/refresh-token', generateNewAccessToken)
authRouter.get('/me', identifyUser, getCurrentUser)

authRouter.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

authRouter.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google_auth_failed`,
        session: false
    }),
    googleAuthCallback
)

export default authRouter