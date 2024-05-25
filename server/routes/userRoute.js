const express = require('express')
const { addNewUser, getUser, addFollower, getMyDetails, getSenderUserId } = require('../controllers/userControllers')

const userRouter = express.Router()

userRouter.route('/new').post(addNewUser)
userRouter.route('/').get(getUser)
userRouter.route('/my').get(getMyDetails)
userRouter.route('/sender-id').get(getSenderUserId)


userRouter.route('/addFollower').post(addFollower)

module.exports = userRouter

