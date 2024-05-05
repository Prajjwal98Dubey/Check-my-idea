const connectDB = require('./config/db')
const cors = require('cors')
const productRouter = require('./routes/productRoute')
const express = require('express')
const userRouter = require('./routes/userRoute')
const commentRouter = require('./routes/commentRoutes')
const blogRouter = require('./routes/blogRoutes')
const searchRouter = require('./config/searchHelper')
const app = express()


app.use(express.json())
app.use(cors())


app.use('/api/v1/product',productRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/comment',commentRouter)
app.use('/api/v1/blogs',blogRouter)
app.use('/api/v1/search',searchRouter)


const startServer = async()=>{
    await connectDB()
    await app.listen(3000,()=>console.log("Server Connected at 3000"))

}
startServer()
