const listHelper = require('../utils/list_helper')
const testHelper = require('../utils/testHelper')

test('dummy returns one', () => {
  const result = listHelper.dummy()
  expect(result).toBe(1)
})

test('no blogs', () => {
  const result = listHelper.totalLikes(null)
  expect(result).toBe(0)
})

test('summa of total likes', () => {
  const result = listHelper.totalLikes(testHelper.blogs)
  expect(result).toBe(36)
})

test('get favorite blog', () => {
  const result = listHelper.favoriteBlog(testHelper.blogs)
  expect(result).toEqual({
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  })
})

test('gete most blogs', () => {
  const result = listHelper.mostBlogs(testHelper.blogs)
  expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
})

test('gete most liked', () => {
  const result = listHelper.mostLikes(testHelper.blogs)
  expect(result).toEqual({
    author: 'Edsger W. Dijkstra',
    likes: 17
  })
})
