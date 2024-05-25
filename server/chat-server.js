const app = require('express')();
const server = require('http').createServer(app)
const {Server} = require('socket.io')

const io = new Server(server,{
    cors:{
        origin:"*"
    }
})
let flag = new Map();  
/*
if we are taking only time as the key then, if there are more than 2 conversation happening which means 4 people in pairs are talking then if two people hit the send btn at the same time then only one key will be set in the map and other message will not.
*/

io.on('connection',(socket)=>{
    let uniqueId;
    // console.log("Socket Connected...",socket.id)
    socket.on('sendEmail',(emails)=>{
        const {sEmail,rEmail} = emails
        let uniqueIdList = [sEmail, rEmail];
        uniqueIdList.sort();
        uniqueId = uniqueIdList[0] + "-" + uniqueIdList[1];
        socket.join(`room-${uniqueId}`)
        socket.on(`chat-${uniqueId}`,(payload)=>{
                if(!flag.has(payload.time.toString() + `-${uniqueId}`))
                    {
                        io.to(`room-${uniqueId}`).emit(`chat-${uniqueId}`,payload)
                        flag.set(payload.time.toString() + `-${uniqueId}`,1);
                    }
                console.log(flag)
        })

    })
})

server.listen(3001,()=>console.log("Server Connected at 3001..."))