const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs || !blogs.length) {
    return 0
  }
  const total = blogs.reduce((likes, blog) => {
    likes = likes + blog.likes
    return likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (!blogs || !blogs.length) {
    return {}
  }
  const likes = blogs.map((b) => b.likes)
  const favorite = blogs.find((b) => b.likes === Math.max(...likes))
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (!blogs || !blogs.length) {
    return {}
  }
  const blogsByAuthor = blogs.reduce((authors, blog) => {
    if (!authors.find(a => a.author === blog.author)) {
      const newAuthor = { author: blog.author, blogs: 1 }
      return [...authors, newAuthor]
    }
    const authorIndex = authors.indexOf(authors.find(a => a.author === blog.author))
    authors[authorIndex].blogs += 1
    return authors
  }, [])
  return blogsByAuthor.find(a => a.blogs === Math.max(...blogsByAuthor.map(b => b.blogs)))
}

const mostLikes = (blogs) => {
  if (!blogs || !blogs.length) {
    return {}
  }
  const blogsByAuthor = blogs.reduce((authors, blog) => {
    if (!authors.find(a => a.author === blog.author)) {
      const newAuthor = { author: blog.author, likes: blog.likes }
      return [...authors, newAuthor]
    }
    const authorIndex = authors.indexOf(authors.find(a => a.author === blog.author))
    authors[authorIndex].likes += blog.likes
    return authors
  }, [])
  return blogsByAuthor.find(a => a.likes === Math.max(...blogsByAuthor.map(b => b.likes)))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
