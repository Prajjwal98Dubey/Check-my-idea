const express = require('express')
const { addNewUser, getUser, addFollower } = require('../controllers/userControllers')

const userRouter = express.Router()

userRouter.route('/new').post(addNewUser)
userRouter.route('/').get(getUser)
userRouter.route('/addFollower').post(addFollower)

module.exports = userRouter

