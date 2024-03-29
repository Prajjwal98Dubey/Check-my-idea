
const express = require('express')
const { createBlog, getAllBlogs, getMyBlogs, deleteMyBlog, editMyBlog } = require('../controllers/blogControllers')
const blogRouter = express.Router()

blogRouter.route('/create-blog').post(createBlog)
blogRouter.route('/getBlogs').get(getAllBlogs)
blogRouter.route('/getMyBlogs').get(getMyBlogs)
blogRouter.route('/edit-blog').put(editMyBlog)
blogRouter.route('/delete-blog').delete(deleteMyBlog)

module.exports = blogRouter