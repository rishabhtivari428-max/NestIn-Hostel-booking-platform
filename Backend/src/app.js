import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import hostelRouter from './routes/hostel.routes.js'
import bookingRouter from './routes/booking.routes.js'
import InquieryRouter from './routes/Inquiry.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('App is running...')
})

app.use('/api/auth', authRouter)
app.use('/api/hostels', hostelRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/inquiery', InquieryRouter)

export default app 