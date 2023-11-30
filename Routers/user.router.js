import express from 'express'
import { getUser, resetPassword, updateUser, userLogin, userRegistration } from '../Controllers/user.controller.js';
import { emailSender } from '../Middleware/Services/nodemailer.js';
import authMiddleware from '../Middleware/auth.middleware.js';



const router = express.Router()

router.post('/register', userRegistration)
router.post('/update', updateUser)
router.post('/login', userLogin)
router.post('/forgot-password',emailSender) 
router.post('/reset-password', resetPassword) 
router.get('/getuser', authMiddleware,getUser)


export default router;