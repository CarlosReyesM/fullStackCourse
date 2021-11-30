const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const testHelper = require('../utils/testHelper')

const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const newUser = {
    name: 'root',
    username: 'superRoot',
    password: 'superRootPassword'
  }

  await api.post('/api/user')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('fetch all users', async () => {
  await api.get('/api/user')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('user wothout user name fails validation', async () => {
  const newUser = { name: 'newUser', username: undefined, password: '1234' }

  await api.post('/api/user')
    .send(newUser)
    .expect(400)
})

test('create new user', async () => {
  const newUser = { name: 'newUser', username: 'newUserName', password: '1234' }

  await api.post('/api/user')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const users = await testHelper.usersInDb()

  expect(users).toHaveLength(2)
})

afterAll(() => {
  mongoose.connection.close()
})
