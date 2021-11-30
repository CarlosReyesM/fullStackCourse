const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body: { title, author, url, likes = 0 } } = request
  if (!title && !url) {
    response.status(400).json('Bad request')
    return
  }
  const user = await User.findById(request.userId)

  const requestObject = { title, author, url, likes, user: user._id }
  const blog = new Blog(requestObject)

  const savedBlog = await blog.save()

  user.blogs = user.blogs?.length ? [...user.blogs, savedBlog._id] : [savedBlog._id]

  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id
  const blogToDelete = await Blog.findById(id)
  if (!blogToDelete) {
    return response.status(404).json('Blog not found')
  }
  if (blogToDelete.user.toString() !== request.userId) {
    return response.status(401).json('unauthorized')
  }

  Blog
    .deleteOne({ _id: id })
    .then(result => response.status(204).json(result))
})

blogRouter.put('/:id', (request, response) => {
  const { body: { likes } } = request
  if (!likes) {
    response.status(400).json('Bad request')
    return
  }
  const id = request.params.id
  Blog
    .find({ _id: id })
    .update({ likes })
    .then(result => response.status(204).json(result))
})

module.exports = blogRouter
