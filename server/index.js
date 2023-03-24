import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB)
    console.log('Connected to Mongodb!')
  } catch (error) {
    throw error
  }
}

mongoose.connection.on('disconneted', () => {
  console.log('mongoDB disconneted!')
})

// mongoose.connection.on('conneted', () => {
//   console.log('mongoDB conneted!')
// })

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
// app.get('/api/test', (req, res) => {
//   res.status(200).json({ test: 'hello world' })
// })

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(8800, () => {
  connect()
  console.log('connected to backend.')
})
