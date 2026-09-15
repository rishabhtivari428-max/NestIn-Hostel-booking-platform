import express from 'express'
const authRouter = express.Router()
import { registerUser, loginUser } from '../controllers/auth.controller.js'

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

export default authRouter