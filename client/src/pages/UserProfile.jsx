import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ADD_FOLLOWER, GET_USER } from "../helpers/backendapi"
import { config } from "../helpers/config"
import Navbar from "../components/Navbar"
import { ProductContext } from "../contexts/productContexts"
import Chat from "../components/Chat"
const UserProfile = () => {
  const [searchParam] = useSearchParams()
  const [isloading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [triggerMount, setTriggerMount] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const productContext = useContext(ProductContext)
  const getUserRef = useRef(true)
  const[chatUniqueId,setChatUniqueId] = useState("")
  // const[chatLoader,setChatLoader] = useState(true)
  useEffect(()=>{
    const createChatUniqueId = ()=>{
      let sEmail = JSON.parse(localStorage.getItem("userCheckMyIdea")).email
      let rEmail = searchParam.get("uid")
      let uniqueIdList = [sEmail, rEmail];
      uniqueIdList.sort();
      setChatUniqueId(uniqueIdList[0] + "-" + uniqueIdList[1])
    }
    createChatUniqueId()
  },[searchParam])
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(GET_USER + `?uid=${searchParam.get("uid")}` + `&luser=${JSON.parse(localStorage.getItem("userCheckMyIdea")).email}`, config)
      setUser(data.userDetails)
      setIsLoading(false)
      if (getUserRef.current) {
        setIsFollowing(data.isPresent)
      }
      console.log(data)
      getUserRef.current = false
    }
    getUser()
  }, [searchParam, triggerMount])
  const handleAddFollower = async () => {
    const { data } = await axios.post(ADD_FOLLOWER, {
      followee: user._id,
      followerEmail: JSON.parse(localStorage.getItem("userCheckMyIdea")).email
    }, config)
    setIsFollowing(data.followerIsFollowing)
    console.log(data)
    setTriggerMount(!triggerMount)
  }
  
  return (
    <div onClick={() => productContext.setSearchBarModal(false)}>
      {isloading ? <div>Loading...</div> :
        <>
          <Navbar />
          <div className="flex justify-center mt-2" >
            <div>
              <img src="https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg" alt="loading" loading="lazy" className="w-[170px] h-[170px] rounded-full" />
              <div className="mt-2 text-center">{user.email}</div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex ">
              <div className="m-1">{user.followers.length} <span className="font-bold">Followers</span></div>
              <div className="m-1">{user.following.length} <span className="font-bold">Following</span></div>
            </div>
          </div>
          <div className="flex justify-center">{!isFollowing ? <button className="w-[150px] h-[30px] bg-green-500 text-center font-bold text-white rounded-lg p-1 text-[15px] hover:bg-green-600 mt-1" onClick={() => handleAddFollower()}> + Follow</button> : <button className="w-[150px] h-[30px] bg-purple-500 text-center font-bold text-white rounded-lg p-1 text-[15px] hover:bg-purple-600 mt-1" onClick={() => handleAddFollower()}> ✓ Following</button>}</div>


            <div className='font-Afacad w-[300px] h-[50px] fixed right-0 bottom-0 bg-black text-white font-bold text-xl flex justify-center items-center rounded-l-md cursor-pointer' onClick={()=>setOpenChat(true)}>Chat with Founder </div>
            {openChat && <div className='rounded-lg fixed z-10 right-0 bottom-0 w-[550px] h-[350px] bg-black text-white font-bold text-xl p-2'>
              <div className='flex justify-end'>
                <div className="cursor-pointer" onClick={() => {
                  setOpenChat(false)
                }
                }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b5aaaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></div>
              </div>
               <Chat chatUniqueId = {chatUniqueId} reciever={searchParam.get("uid")} />
              {/* {!chatLoader && <NewChat receiver={searchParams.get('v')} chatUniqueId = {chatUniqueId} dbChats={dbChats}/>} */}
            </div>
            }
       
        </>
      }
    </div>
  )
}

export default UserProfile
