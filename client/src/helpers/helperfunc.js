
export const settingUpLocalStorage=(email,displayName,photoUrl)=>{
        localStorage.setItem("userCheckMyIdea",JSON.stringify({
            email,displayName,photoUrl
        }))
}

