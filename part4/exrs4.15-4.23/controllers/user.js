const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

  response.json(users.map(user => user.toJSON()))
})

userRouter.post('/', async (request, response, next) => {
  const { body: { name, username, password } } = request

  if (!username || !password || username.length < 3 || password.length < 3) {
    return response.status(400).json('Bad request')
  }
  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({ name, username, passwordHash })
  user.save((err, res) => { if (err) { return next(err) }; return response.status(201).json(res) })
})

module.exports = userRouter
