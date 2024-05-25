const app = require('express')();
const server = require('http').createServer(app)
const {Server} = require('socket.io')

const io = new Server(server,{
    cors:{
        origin:"*"
    }
})

io.on('connection',(socket)=>{
    let uniqueId;
    console.log("Socket Connected...",socket.id)
    socket.on('sendEmail',(emails)=>{
        const {sEmail,rEmail} = emails
        let uniqueIdList = [sEmail, rEmail];
        uniqueIdList.sort();
        uniqueId = uniqueIdList[0] + "-" + uniqueIdList[1];
        socket.join(`room-${uniqueId}`)
        socket.on(`chat-${uniqueId}`,(payload)=>{
            io.to(`room-${uniqueId}`).emit(`chat-${uniqueId}`,payload)
        })

    })
})

server.listen(3001,()=>console.log("Server Connected at 3001..."))