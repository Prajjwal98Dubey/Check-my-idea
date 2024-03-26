const mongoose = require('mongoose')
const Comment = require('./commentSchema')
const Product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    founder:{
        type:String,
        required:true
    },
    founderMessage:{
        type:String
    },
    logo: {
        type: String,
        default:"https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1710374400&semt=sph"
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String
        // required:true
    },
    linkToWeb: {
        type: String
    },
    comments: {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Comment'
    },
    keywords: {
        type: [String]
    },
    voteCount: {
        type: [String]
    },
    time:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model('Product', Product)