/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react"
// import { useSearchParams } from "react-router-dom"
import { io } from 'socket.io-client'
import { ADD_CHAT_MESSAGE, GET_DB_CHATS, LOADER_IMG_ICON } from "../helpers/backendapi";
import { config } from "../helpers/config";
// import { useState } from "react"
const socket = io.connect("http://localhost:3001")
// eslint-disable-next-line react/prop-types

/*
const Chat = () => {
    const [message, setMessage] = useState("")
    const [chats,setChats] = useState([])
    const [searchParam] = useSearchParams();
    useEffect(() => {
        const sendEmailsToChatServer = () => {
            socket.emit('sendEmail', { sEmail: JSON.parse(localStorage.getItem("userCheckMyIdea")).email, rEmail: searchParam.get("uid") })
        }
        sendEmailsToChatServer()
    }, [searchParam])
    useEffect(()=>{
        const recieveChats=()=>{
            socket.on("chat-john.doe1@gmail.com-kabir.bulletsingh@gmail.com",(payload)=>{
                setChats([...chats,payload])
            })
        }
        recieveChats()
    })
    const sendMessage = () => {
        socket.emit("chat-john.doe1@gmail.com-kabir.bulletsingh@gmail.com", { message, user: JSON.parse(localStorage.getItem("userCheckMyIdea")).email })
        setMessage("")
    }
    return (
        <>
            {console.log(chats)}
            <div className='h-[250px] overflow-y-scroll mb-[20px]'>
                {
                    <div className=''>
                        {chats && chats.map((c, i) =>
                            (c.user === JSON.parse(localStorage.getItem("userCheckMyIdea")).email ? <div key={i} className='w-full flex justify-end'><div className='w-fit h-fit border border-white text-sm p-1 rounded-md mr-[4px] mt-[6px] mb-[6px] bg-green-400 text-black rounded-tr-xl'>{c.message}</div></div> : <div key={i} className=' flex justify-start w-fit h-fit border border-white text-sm p-1 rounded-md ml-[4px] mt-[6px] mb-[6px] bg-slate-300 text-black rounded-tl-xl'>{c.message}</div>)
                        )}
                    </div>
                }
            </div>
            <div className="font-Custom flex justify-center ">
                <div className="fixed bottom-2">
                    <input  type="text" className="w-[400px] h-[35px] rounded-l-md  text-black" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <span><button className="w-[100px] h-[35px] bg-green-500 hover:bg-green-700  cursor-pointer text-white font-bold rounded-r-md" onClick={sendMessage}>send</button></span>
                </div>
            </div>

        </>
    )
}

export default Chat

/*
<div className='h-[100px]'>
                <div className=' flex justify-center'>
                    <input type="text" className= 'w-[350px] h-[35px] border border-white text-black mr-[2px]' value={message} onChange={(e) => setMessage(e.target.value)} />
                    <span><button type='submit' className='w-[70px] bg-green-600 h-[35px] font-light' onClick={()=>{
                    }}>send</button></span>
                </div>
            </div>
*/


const Chat = ({ chatUniqueId, reciever }) => {
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([])
    const [oldChats, setOldChats] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isTyping, setTyping] = useState(false)
    const sendEmailRef = useRef(true)

    useEffect(() => {
        const recieveChats = () => {
            socket.on(`chat-${chatUniqueId}`, (payload) => {
                setChats([...chats, payload])
            })
        }
        recieveChats()
    })
    useEffect(() => {
        const sendEmailThroughSocket = () => {
            socket.emit('sendEmail', { sEmail: JSON.parse(localStorage.getItem("userCheckMyIdea")).email, rEmail: reciever })
        }
        const handleOldChats = async () => {
            const { data } = await axios.get(GET_DB_CHATS + `?chatid=${chatUniqueId}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setOldChats(data)
            setIsLoading(false)

        }
        if (sendEmailRef.current) {
            sendEmailThroughSocket()
            sendEmailRef.current = false
        }
        handleOldChats()

    }, [chatUniqueId, reciever])
    const sendMessageAndAddMessageToDB = async () => {
        await socket.emit(`chat-${chatUniqueId}`, { message, user: JSON.parse(localStorage.getItem("userCheckMyIdea")).email, time: Date.now() })
        await axios.post(ADD_CHAT_MESSAGE, {
            sEmail: JSON.parse(localStorage.getItem("userCheckMyIdea")).email,
            rEmail: reciever,
            chatUniqueId: chatUniqueId,
            message: message
        }, config)
        setMessage("")
        socket.emit('sender-typing', { payload: 0, senderEmail: JSON.parse(localStorage.getItem("userCheckMyIdea")).email })

    }
    useEffect(() => {
        socket.on('sender-typing', (payload) => {
            if (payload.payload >= 1 && payload.senderEmail !== JSON.parse(localStorage.getItem("userCheckMyIdea")).email) setTyping(true)
            else setTyping(false)
        })
    }, [message])
    return (
        <>
            <div className='h-[250px] overflow-y-scroll mb-[20px]'>
                {isLoading ? <div className=" flex justify-center"><img src={LOADER_IMG_ICON} className="w-[75px] h-[75px] rounded-full animate-ping items-center mt-[110px]" alt="loading" /></div> :
                    <div className=''>
                        {oldChats && oldChats.map((c, i) =>
                            (c.senderId === JSON.parse(localStorage.getItem("IdeaBoxSenderDetails")) ? <div key={i} className='w-full flex justify-end'><div className='w-fit h-fit border border-white text-sm p-1 rounded-md mr-[4px] mt-[6px] mb-[6px] bg-green-400 text-black rounded-tr-xl'>{c.message}</div></div> : <div key={i} className=' flex justify-start w-fit h-fit border border-white text-sm p-1 rounded-md ml-[4px] mt-[6px] mb-[6px] bg-slate-300 text-black rounded-tl-xl'>{c.message}</div>)
                        )}
                    </div>
                }
                {
                    <div className=''>
                        {chats && chats.map((c, i) =>
                            (c.user === JSON.parse(localStorage.getItem("userCheckMyIdea")).email ? <div key={i} className='w-full flex justify-end'><div className='w-fit h-fit border border-white text-sm p-1 rounded-md mr-[4px] mt-[6px] mb-[6px] bg-green-400 text-black rounded-tr-xl'>{c.message}</div></div> : <div key={i} className=' flex justify-start w-fit h-fit border border-white text-sm p-1 rounded-md ml-[4px] mt-[6px] mb-[6px] bg-slate-300 text-black rounded-tl-xl'>{c.message}</div>)
                        )}
                    </div>
                }
            </div>
            {!isLoading && <div className="font-Custom flex justify-center ">
                <div className="fixed bottom-2">
                    {isTyping && <div className="text-yellow-400 ">typing....</div>}
                    <input type="text" className="w-[400px] h-[35px] rounded-l-md  text-black" value={message} onChange={(e) => {
                        setMessage(e.target.value)
                        socket.emit('sender-typing', { payload: e.target.value.length, senderEmail: JSON.parse(localStorage.getItem("userCheckMyIdea")).email })
                    }} />
                    <span><button className="w-[100px] h-[35px] bg-green-500 hover:bg-green-700  cursor-pointer text-white font-bold rounded-r-md" onClick={() => {
                        sendMessageAndAddMessageToDB()

                    }}>send</button></span>
                </div>
            </div>}
        </>
    )
}

export default Chat