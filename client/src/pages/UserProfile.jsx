import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ADD_FOLLOWER, GET_USER } from "../helpers/backendapi"
import { config } from "../helpers/config"
import Navbar from "../components/Navbar"
const UserProfile = () => {
  const [searchParam] = useSearchParams()
  const [isloading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [triggerMount, setTriggerMount] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const getUserRef = useRef(true)
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(GET_USER + `?uid=${searchParam.get("uid")}` + `&luser=${JSON.parse(localStorage.getItem("userCheckMyIdea")).email}`, config)
      setUser(data.userDetails)
      setIsLoading(false)
      if (getUserRef.current){
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
    <>
      { }
      {isloading ? <div>Loading...</div> :
        <>
          <Navbar />
          <div className="flex justify-center mt-2">
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
        </>
      }
    </>
  )
}

export default UserProfile
