const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectDB=async()=>{
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`DB connected with ${connection.connection.host}`)
}
module.exports = connectDB