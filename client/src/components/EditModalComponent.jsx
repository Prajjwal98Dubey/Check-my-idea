import { useState } from "react"
import { CLOSE_ICONS } from "../helpers/icons"


const EditModalComponent = (updatingBlog,editModal,setEditModal) => {
    const[editedTitle,setEditedTitle] = useState(updatingBlog.updatingBlog.title)
    const[editeDescription,setEditedDescription] =  useState(updatingBlog.updatingBlog.description)
    console.log(editModal)
  return (
    <div className="w-[550px] h-[380px] z-10 bg-white rounded-lg border border-gray-400">
        <div className="flex justify-end">
            <img src={CLOSE_ICONS} alt="loading" className="w-[25px] h-[15px] cursor-pointer" onClick={()=>setEditModal(false)} />
        </div>
        <div>
          <div className="flex justify-center">
            <input type="text" className="w-[350px] h-[45px] m-1 rounded-lg border border-gray-500" value={editedTitle} onChange={(e)=>setEditedTitle(e.target.value)}/>
            </div>
            <div className="flex justify-center">
            <textarea type="text" className="w-[350px] m-1 h-[250px] rounded-lg border border-gray-500" value={editeDescription} onChange={(e)=>setEditedDescription(e.target.value)}></textarea>
          </div>
        </div>
        <div className="flex justify-center"><button className="w-[90px] h-[30px]
        bg-red-600 hover:bg-red-500 hover:cursor-pointer rounded-lg">Edit</button></div>
    </div>
  )
}

export default EditModalComponent