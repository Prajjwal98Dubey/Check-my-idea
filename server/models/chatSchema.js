
const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            required: true
        }
    ],
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    chatUniqueId: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Chat", chatSchema)
