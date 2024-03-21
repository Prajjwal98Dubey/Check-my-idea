const express = require('express')
const { addNewComment, getAllComments } = require('../controllers/commentControllers')


const commentRouter = express.Router()

commentRouter.route('/new').post(addNewComment)
commentRouter.route('/get-comments').get(getAllComments)


module.exports = commentRouter