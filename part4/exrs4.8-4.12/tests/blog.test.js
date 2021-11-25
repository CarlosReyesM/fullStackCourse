const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const testHelper = require('../utils/testHelper')

const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = testHelper.blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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
  const newBlog = {
    title: 'new blog post',
    author: 'new author post',
    url: 'http://newPostUrl.html',
    likes: 500
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await testHelper.blogsInDb()
  expect(response).toHaveLength(testHelper.blogs.length + 1)
})

test('missing likes equal 0', async () => {
  const newBlog = {
    title: 'new blog missing likes',
    author: 'new missing likes author post',
    url: 'http://newMissingLikesPostUrl.html'
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await await testHelper.blogsInDb()
  const missingLikeBlog = response.find(b => b.title === 'new blog missing likes')

  expect(missingLikeBlog.likes).toBe(0)
})

test('missing title and url', async () => {
  const newBlog = {
    title: '',
    author: 'author of missing title and url post',
    url: '',
    likes: 4
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
