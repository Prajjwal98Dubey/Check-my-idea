import axios from "axios"
import { UPVOTE_THE_PRODUCT } from "./backendapi"
import { config } from "./config"

export const settingUpLocalStorage=(email,displayName,photoUrl)=>{
        localStorage.setItem("userCheckMyIdea",JSON.stringify({
            email,displayName,photoUrl
        }))
}

export const handleUpVote=async(productId,user)=>{
    await axios.post(UPVOTE_THE_PRODUCT,{
      productId:productId,
      user:user
    },config)
}
