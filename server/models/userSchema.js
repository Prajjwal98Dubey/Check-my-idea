const mongoose = require('mongoose')

const User = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    upVotedProducts:{
        type:[String]
    },
    isFounder:{
        type:Boolean
    }
})

module.exports= mongoose.model('User',User)