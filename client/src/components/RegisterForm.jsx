import Navbar from "./Navbar"
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import app from '../firebase'
import { useState } from "react"
import { USER_DEFAULT_IMG } from "../helpers/icons"
import { useNavigate } from "react-router"
const auth = getAuth(app)
const RegisterForm = () => {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()
    const registerUser=async(e)=>{
        e.preventDefault()
        await createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            let displayName = userCredential.user.email.substring(0,4)
            localStorage.setItem('userCheckMyIdea',JSON.stringify({email:userCredential.user.email,displayName:displayName,photoUrl:USER_DEFAULT_IMG}))
            navigate('/')
          })
          .catch((error) => {
            console.log(error)
          });
        setEmail("")
        setPassword("")
        return
    }
    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-[10px]">
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-[400px] h-[40px] rounded-lg border border-gray-400 p-1 m-1" />
                    <br />
                    <label htmlFor="email">Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-[400px] h-[40px] rounded-lg border border-gray-400 p-1 m-1" />
                    <div className="flex justify-center"><button className="font-semibold w-[140px] h-[40px] text-white bg-blue-500 cursor-pointer hover:bg-blue-400 rounded-lg" onClick={(e)=>registerUser(e)}>Register</button></div>
                </form>
            </div>
        </>
    )
}

export default RegisterForm