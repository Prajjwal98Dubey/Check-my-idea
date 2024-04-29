import { useNavigate } from "react-router"
// import Navbar from "../components/Navbar"
// import MyBlog from "../components/MyBlog"
// import MyBlogDisplay from "../components/MyBlogDisplay"
import { useEffect, useState } from "react"
import { lazy, Suspense } from "react"
import axios from "axios"
import { GET_MY_DETAILS } from "../helpers/backendapi"
import { config } from "../helpers/config"

const Navbar = lazy(() => import("../components/Navbar"))
const MyBlog = lazy(() => import("../components/MyBlog"))
const MyBlogDisplay = lazy(() => import("../components/MyBlogDisplay"))
const MyProfile = () => {
  const navigate = useNavigate()
  const [newBlogMount, setNewBlogMount] = useState(false)
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const handleUserLogout = () => {
    localStorage.removeItem("userCheckMyIdea")
    navigate('/')
    return
  }
  useEffect(() => {
    const getMyDetails = async () => {
      const { data } = await axios.get(GET_MY_DETAILS + `?uid=${JSON.parse(localStorage.getItem("userCheckMyIdea")).email}`, config)
      setUser(data)
      setIsLoading(false)
    }
    getMyDetails()
  }, [])
  return (
    <>
    {console.log(user)}
      <Suspense fallback={<h2>Loading...</h2>}><Navbar /></Suspense>
      <div className="flex justify-center mt-2">
        <div>
          <img src="https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg" alt="loading" loading="lazy" className="w-[170px] h-[170px] rounded-full" />
          <div className="mt-2 text-center">{JSON.parse(localStorage.getItem("userCheckMyIdea")).email}</div>
        </div>
      </div>
      {isLoading ? <div>Loading...</div> :<div className="flex justify-center mt-2">
        <div className="flex ">
          <div className="m-1">{user.followers.length} <span className="font-bold">Followers</span></div>
          <div className="m-1">{user.following.length}  <span className="font-bold">Following</span></div>
        </div>
      </div>}
      <Suspense fallback={<h2>Loading...</h2>}><MyBlog setNewBlogMount={setNewBlogMount} /></Suspense>
      <div className="flex justify-center items-center p-10">
        <button onClick={handleUserLogout} className="w-[120px] h-[35px] bg-red-500 hover:bg-red-400 cursor-pointer text-white font-Cursive rounded-lg">Logout</button>
      </div>
      <div className="flex">
        <div className="w-1/2"><Suspense fallback={<h2>Loading...</h2>}><MyBlogDisplay newBlogMount={newBlogMount} /></Suspense></div>
        <div></div>
      </div>
    </>
  )
}

export default MyProfile