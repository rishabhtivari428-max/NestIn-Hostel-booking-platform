import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import hostelRouter from './routes/hostel.routes.js'
import bookingRouter from './routes/booking.routes.js'
import InquieryRouter from './routes/Inquiry.routes.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import './config/passport.js'
import './config/passport.js'
import { googleAuthCallback } from './controllers/auth.controller.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.endsWith('.netlify.app') || origin.endsWith('.onrender.com')) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())


app.get('/', (req, res) => {
    res.send('App is running...')
})

app.use('/api/auth', authRouter)
// Fallback for Google OAuth callback if GOOGLE_CALLBACK_URL in Google Console is /auth/google/callback without /api
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google_auth_failed`,
    session: false
}), googleAuthCallback)
app.use('/api/hostels', hostelRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/inquiery', InquieryRouter)

export default app 