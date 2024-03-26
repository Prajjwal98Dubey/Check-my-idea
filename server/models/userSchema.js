const mongoose = require('mongoose')

const User = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    upVotedProducts:{
        type:[String]
    }
})

module.exports= mongoose.model('User',User)