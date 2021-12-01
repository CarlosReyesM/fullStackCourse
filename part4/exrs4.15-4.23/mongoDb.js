const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const mongoUrl = config.MONGODB_URI

const connectDB = async (url) => {
  logger.info('connecting to', mongoUrl)

  await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.connection.on('connect', () => {
    logger.info('mongoose connectged')
  })
  mongoose.connection.on('error', err => {
    logger.error(err)
  })
}

module.exports = { connectDB }
