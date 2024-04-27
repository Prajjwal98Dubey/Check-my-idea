const mongoose = require('mongoose')
const User = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    upVotedProducts:{
        type:[String]
    },
    isFounder:{
        type:Boolean
    },
    followers:{
        type:[String]
    },
    following:{
        type:[String]
    },
})

module.exports= mongoose.model('User',User)