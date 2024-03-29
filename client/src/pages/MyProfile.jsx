import { useNavigate } from "react-router"
import Navbar from "../components/Navbar"
import MyBlog from "../components/MyBlog"
import MyBlogDisplay from "../components/MyBlogDisplay"

const MyProfile = () => {
    const navigate = useNavigate()
    const handleUserLogout=()=>{
        localStorage.removeItem("userCheckMyIdea")
        navigate('/')
        return
    }
  return (
    <>
    <Navbar/>
    <MyBlog/>
    <div className="flex justify-center items-center p-10">
        <button onClick={handleUserLogout} className="w-[120px] h-[35px] bg-red-500 hover:bg-red-400 cursor-pointer text-white font-Cursive rounded-lg">Logout</button>
    </div>
    <div className="flex">
                <div className="w-1/2"><MyBlogDisplay/></div>
                <div></div>
            </div>
    </>
  )
}

export default MyProfile