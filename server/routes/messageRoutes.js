
const express = require('express')
const { addMessage, getAllChats } = require('../controllers/messageControllers')

const messageRouter = express.Router()

messageRouter.route('/').post(addMessage)
messageRouter.route('/chats').get(getAllChats)

module.exports = messageRouter