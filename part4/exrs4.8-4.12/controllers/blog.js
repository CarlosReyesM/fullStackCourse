const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const { body: { title, author, url, likes = 0 } } = request
  if (!title && !url) {
    response.status(400).json('Bad request')
    return
  }
  const requestObject = { title, author, url, likes }
  const blog = new Blog(requestObject)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogRouter.delete('/:id', (request, response) => {
  const id = request.params.id
  Blog
    .find({ _id: id })
    .remove()
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
