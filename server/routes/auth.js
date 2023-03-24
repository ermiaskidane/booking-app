import express from 'express'
import { login, register } from '../controllers/auth.js'

const router = express.Router()
console.log('@@@@@hello for register')
router.post('/register', register)
router.post('/login', login)

export default router
