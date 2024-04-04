import { Link, useNavigate } from "react-router-dom"
// import Navbar from "./Navbar"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import app from "../firebase"
import { lazy, useState ,Suspense} from "react"
import { GOOGLE_ICON_IMG, USER_DEFAULT_IMG } from "../helpers/icons"
import { settingUpLocalStorage } from "../helpers/helperfunc"
import axios from "axios"
import { ADD_NEW_USER } from "../helpers/backendapi"
import { config } from "../helpers/config"
const auth = getAuth(app)
const provider = new GoogleAuthProvider(app)

const Navbar = lazy(()=>import("./Navbar"))
const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()
    const loginUser = async (e) => {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                let displayName = userCredential.user.email.substring(0,4)
                settingUpLocalStorage(userCredential.user.email,userCredential.user.displayName ? userCredential.user.displayName:displayName,userCredential.user.photoURL ?userCredential.user.photoURL : USER_DEFAULT_IMG)
                await axios.post(ADD_NEW_USER,{email:userCredential.user.email},config)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            });

        return
    }
    const signInWithGoogle = async(e) => {
        e.preventDefault()
       await signInWithPopup(auth, provider)
            .then(async(result) => {
                settingUpLocalStorage(result.user.email,result.user.displayName,result.user.photoURL)
                await axios.post(ADD_NEW_USER,{email:result.user.email},config)
                navigate('/')
            }).catch((error) => {
                console.log(error)
            });
    }
    return (
        <>
            <Suspense fallback={<h2>Loading...</h2>}><Navbar /></Suspense>
            <div className="flex justify-center mt-[10px] font-Custom">
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-[400px] h-[40px] rounded-lg border border-gray-400 p-1 m-1" />
                    <br />
                    <label htmlFor="email">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-[400px] h-[40px] rounded-lg border border-gray-400 p-1 m-1" />
                    <div className="flex justify-center"><button className="font-semibold w-[140px] h-[40px] text-white bg-blue-500 cursor-pointer hover:bg-blue-400 rounded-lg" onClick={(e) => loginUser(e)}>Login</button></div>
                    <div className="flex justify-center">
                        <Link to="/register"><div className="text-blue-600 font-semibold cursor-pointer">register</div></Link>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex">
                            <span className="m-1 font-semibold">Login with</span>
                            <img className="w-[20px] h-[20px] rounded-full mt-[5px] cursor-pointer" src={GOOGLE_ICON_IMG} alt="loading" loading="lazy" onClick={(e) => signInWithGoogle(e)} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginForm