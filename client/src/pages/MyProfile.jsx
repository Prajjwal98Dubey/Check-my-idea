import { useNavigate } from "react-router"
import Navbar from "../components/Navbar"

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
    <div className="flex justify-center items-center p-10">
        <button onClick={handleUserLogout} className="w-[120px] h-[35px] bg-red-500 hover:bg-red-400 cursor-pointer text-white font-Cursive rounded-lg">Logout</button>
    </div>
    </>
  )
}

export default MyProfile