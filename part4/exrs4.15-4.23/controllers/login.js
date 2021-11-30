const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { body: { username: bodyUsername, password } } = request
  const user = await User.findOne({ username: bodyUsername })

  const { name, username, passwordHash } = user

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }
  const userForToken = {
    username: username,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username, name })
})

module.exports = loginRouter
