
const express = require('express')
const { createBlog, getAllBlogs, getMyBlogs, deleteMyBlog } = require('../controllers/blogControllers')
const blogRouter = express.Router()

blogRouter.route('/create-blog').post(createBlog)
blogRouter.route('/getBlogs').get(getAllBlogs)
blogRouter.route('/getMyBlogs').get(getMyBlogs)
blogRouter.route('/edit-blog')
blogRouter.route('/delete-blog').delete(deleteMyBlog)

module.exports = blogRouter