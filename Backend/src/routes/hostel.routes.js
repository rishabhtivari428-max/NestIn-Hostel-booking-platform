import express from 'express'
const hostelRouter = express.Router()
import { addHostel, getHostelById, getAllHostels, getHostelbyOwner, deleteHostel } from '../controllers/hostel.controller.js'
import { identifyUser, authorizeRoles } from '../middleware/auth.middleware.js'

hostelRouter.post('/addhostel', identifyUser, authorizeRoles('Owner', 'Admin'), addHostel) //Add a hostel

hostelRouter.get('/gethostel/:id', identifyUser, getHostelById) //Get information of a particular hostel

hostelRouter.get('/getallhostels', identifyUser, getAllHostels) //Get all available hostels

hostelRouter.get('/gethostelsbyOwner/:id', identifyUser, authorizeRoles('Owner', 'Admin'), getHostelbyOwner) //Get all hostels by Owner

hostelRouter.delete('/deletehostel/:id', identifyUser, authorizeRoles('Owner', 'Admin'), deleteHostel)

export default hostelRouter