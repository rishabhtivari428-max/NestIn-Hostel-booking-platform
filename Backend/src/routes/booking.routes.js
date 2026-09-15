import express from 'express'
const bookingRouter = express.Router()
import { BookHostel, getBooking, CancelBooking, getSingleBooking} from '../controllers/booking.controller.js'
import { identifyUser } from '../middleware/auth.middleware.js'

bookingRouter.post('/book/:id', identifyUser, BookHostel) //Book a hostel

bookingRouter.get('/getbookings', identifyUser, getBooking) //Get details of all booked hostels

bookingRouter.get('/getsinglebooking/:id', identifyUser, getSingleBooking) //Get details of a particular hostel booked by a User

bookingRouter.delete('/cancelbooking/:id', identifyUser, CancelBooking) //Cancel booked hostel

export default bookingRouter