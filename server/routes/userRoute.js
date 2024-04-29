const express = require('express')
const { addNewUser, getUser, addFollower, getMyDetails } = require('../controllers/userControllers')

const userRouter = express.Router()

userRouter.route('/new').post(addNewUser)
userRouter.route('/').get(getUser)
userRouter.route('/my').get(getMyDetails)

userRouter.route('/addFollower').post(addFollower)

module.exports = userRouter

