const express = require('express')
const { addNewComment } = require('../controllers/commentControllers')


const commentRouter = express.Router()

commentRouter.route('/new').post(addNewComment)


module.exports = commentRouter