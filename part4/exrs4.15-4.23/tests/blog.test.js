const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const testHelper = require('../utils/testHelper')

const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.blogs)
})

test('fetch all blogs', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('exist id property', async () => {
  const response = await testHelper.blogsInDb()

  expect(response[0].id).toBeDefined()
})

test('posting new blog', async () => {
  const userLogIn = await api.post('/api/login').send({
    username: 'superRoot',
    password: 'superRootPassword'
  })
  const { token } = userLogIn
  const newBlog = {
    title: 'new blog post',
    author: 'new author post',
    url: 'http://newPostUrl.html',
    likes: 500
  }

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await testHelper.blogsInDb()
  expect(response).toHaveLength(testHelper.blogs.length + 1)
})

test('missing likes equal 0', async () => {
  const userLogIn = await api.post('/api/login').send({
    username: 'superRoot',
    password: 'superRootPassword'
  })
  const { token } = userLogIn
  const newBlog = {
    title: 'new blog missing likes',
    author: 'new missing likes author post',
    url: 'http://newMissingLikesPostUrl.html'
  }

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await testHelper.blogsInDb()
  const missingLikeBlog = response.find(b => b.title === 'new blog missing likes')

  expect(missingLikeBlog.likes).toBe(0)
})

test('missing title and url', async () => {
  const userLogIn = await api.post('/api/login').send({
    username: 'superRoot',
    password: 'superRootPassword'
  })
  const { token } = userLogIn
  const newBlog = {
    title: '',
    author: 'author of missing title and url post',
    url: '',
    likes: 4
  }

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('delete single blog', async () => {
  const userLogIn = await api.post('/api/login').send({
    username: 'superRoot',
    password: 'superRootPassword'
  })
  console.log(userLogIn)
  const { token } = userLogIn
  const blogs = await testHelper.blogsInDb()
  const blogToDelete = blogs[0].id

  await api
    .delete(`/api/blogs/${blogToDelete}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const restBlogs = await testHelper.blogsInDb()

  expect(restBlogs).toHaveLength(testHelper.blogs.length - 1)
})

test('update an object', async () => {
  const blogs = await testHelper.blogsInDb()
  const blogToUpdate = blogs[0].id
  const updateParams = { likes: 8 }

  await api
    .put(`/api/blogs/${blogToUpdate}`)
    .send(updateParams)
    .expect(204)

  const updatedBlogs = await testHelper.blogsInDb()

  const blogUpdated = updatedBlogs.find(b => b.id === blogToUpdate)

  expect(blogUpdated.likes).toBe(8)
})

afterAll(() => {
  mongoose.connection.close()
})
