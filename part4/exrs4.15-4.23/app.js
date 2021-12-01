const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const mongoDB = require('./mongoDb')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoDB.connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
