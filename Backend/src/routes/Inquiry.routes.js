import express from 'express'
const InquieryRouter = express.Router()
import { createInquiery, getInquiery, deleteInquiery, updateInquieryStatus } from '../controllers/inquiery.controller.js'
import { identifyUser } from '../middleware/auth.middleware.js'

InquieryRouter.post('/createInq/:id', identifyUser, createInquiery)

InquieryRouter.get('/getInq', identifyUser, getInquiery)
InquieryRouter.get('/getInq/:id', identifyUser, getInquiery)

InquieryRouter.patch('/updateStatus/:id', identifyUser, updateInquieryStatus)

InquieryRouter.delete('/deleteInq/:id', identifyUser, deleteInquiery)

export default InquieryRouter