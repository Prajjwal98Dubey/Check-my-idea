import { useState } from "react"
const Comments = (commentlist) => {
  const [comments] = useState(commentlist)
  return (
    <>
      {
        comments.commentlist.map((comm, index) => (
          <div className="m-1 flex " key={index}>
            <div className="w-[30px] h-[30px] rounded-full mt-[2px]  bg-black text-white font-semibold flex justify-center items-center">{comm.username.charAt(0).toUpperCase()}</div>
            <div className="ml-[3px] flex justify-center items-center text-gray-800">
              <div className="flex items-center mb-[4px]">
                <div>
                <div className="font-bold text-sm h-[13px] mb-[1px]">{comm.username.substring(0,comm.username.indexOf("@"))}</div>
                <div className="text-sm h-[12px] mt-[1px]">{comm.comment}</div>
                </div>
              </div>
            </div>
          </div>
        ))

      }
    </>
  )
}

export default Comments