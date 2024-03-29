const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type:String,
        required:true
    },
    topics: {
        type: [String]
    },
    likesCount:{
        type:Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Blog', blogSchema)