const connectDB = require('./config/db')
const cors = require('cors')
const productRouter = require('./routes/productRoute')
const express = require('express')
const app = express()

app.use(express.json())
app.use(cors())


app.use('/api/v1/product',productRouter)

const startServer = async()=>{
    await connectDB()
    await app.listen(3000,()=>console.log("Server Connected at 3000"))

}

startServer()