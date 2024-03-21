import { useState } from "react"
const Comments = (commentlist) => {
    const[comments] = useState(commentlist) 
  return (
    <>
    {
        comments.commentlist.map((comm,index)=>(
                <div className="m-1 flex " key={index}>
                        <div className="w-[40px] h-[40px] rounded-full bg-black text-white font-semibold flex justify-center items-center">{comm.username.charAt(0).toUpperCase()}</div>
                        <div className="ml-[3px] flex justify-center items-center text-gray-800">
                            <div>
                            <div className="font-semibold text-sm">{comm.username}</div>
                            <div className="text-sm">{comm.comment}</div>
                            </div>
                        </div>
                    </div>
        ))
        
    }
    </>
  )
}

export default Comments