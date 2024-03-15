const express = require('express')
const { addNewUser } = require('../controllers/userControllers')

const userRouter = express.Router()

userRouter.route('/new').post(addNewUser)


module.exports = userRouter

