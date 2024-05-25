const User = require('../models/userSchema')
const Message = require('../models/messageSchema')
const Chat = require('../models/chatSchema')
const addMessage = async (req, res) => {
    const { sEmail, rEmail, message, chatUniqueId } = req.body
    const sender = await User.findOne({ email: sEmail })
    const receiver = await User.findOne({ email: rEmail })
    const sId = sender._id
    const rId = receiver._id
    const newMessage = await Message.create({
        senderId: sId,
        recieverId: rId,
        message: message
    })
    let oldChats = [];
    let chat = null;
    chat = await Chat.findOne({ chatUniqueId: chatUniqueId })
    if (chat) {
        oldChats = chat.chats
        await Chat.findOneAndUpdate({ chatUniqueId: chatUniqueId }, { chats: [...oldChats, newMessage._id], participants: [sId, rId] })
    }
    else {
        await Chat.create({
            chats: [newMessage._id],
            participants: [sId, rId],
            chatUniqueId: chatUniqueId
        })
    }
    res.json(newMessage)
}


const getAllChats = async (req, res) => {
    const chatUniqueId  = req.query.chatid
    const isConversationPresent = await Chat.findOne({ chatUniqueId: chatUniqueId })
    let chats = [];
    if (isConversationPresent) {
        for (let i = 0; i < isConversationPresent.chats.length; i++) {
            const messageData = await Message.findOne({ _id: isConversationPresent.chats[i] })
            if (messageData) chats.push(messageData)
        }
        res.json(chats)
        return
    }
    else{
        res.json(chats)
    }

}

module.exports = {addMessage,getAllChats}