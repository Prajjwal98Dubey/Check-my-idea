import { useNavigate } from "react-router"
// import Navbar from "../components/Navbar"
// import MyBlog from "../components/MyBlog"
// import MyBlogDisplay from "../components/MyBlogDisplay"
import { useState } from "react"
import { lazy,Suspense } from "react"

const Navbar = lazy(()=>import("../components/Navbar"))
const MyBlog = lazy(()=>import("../components/MyBlog"))
const MyBlogDisplay = lazy(()=>import("../components/MyBlogDisplay"))




const MyProfile = () => {
    const navigate = useNavigate()
    const[newBlogMount,setNewBlogMount] = useState(false)
    const handleUserLogout=()=>{
        localStorage.removeItem("userCheckMyIdea")
        navigate('/')
        return
    }
  return (
    <>
    <Suspense fallback={<h2>Loading...</h2>}><Navbar/></Suspense>
    <Suspense fallback={<h2>Loading...</h2>}><MyBlog setNewBlogMount={setNewBlogMount}/></Suspense>
    <div className="flex justify-center items-center p-10">
        <button onClick={handleUserLogout} className="w-[120px] h-[35px] bg-red-500 hover:bg-red-400 cursor-pointer text-white font-Cursive rounded-lg">Logout</button>
    </div>
    <div className="flex">
                <div className="w-1/2"><Suspense fallback={<h2>Loading...</h2>}><MyBlogDisplay newBlogMount={newBlogMount}/></Suspense></div>
                <div></div>
            </div>
    </>
  )
}

export default MyProfile