import axios from "axios"
import { useEffect, useState } from "react"
import { DELETE_MY_BLOG, GET_MY_BLOGS } from "../helpers/backendapi"
import { DELETE_ICON, EDIT_ICON, LIKE_ICON } from "../helpers/icons"
import EditModalComponent from "./EditModalComponent"

const MyBlogDisplay = () => {
    const[blogs,setBlogs]  = useState([])
    const[isLoading,setIsLoading] = useState(true)
    const[editModal,setEditModal] = useState(false)
    const handleDeleteBlog=async(id)=>{
            await axios.delete(DELETE_MY_BLOG+id,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
    }
    useEffect(() => {
        const fetchMyBlogs = async () => {
            const { data } = await axios.get(GET_MY_BLOGS + JSON.parse(localStorage.getItem("userCheckMyIdea")).email, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setIsLoading(true)
            setBlogs(data)
            setIsLoading(false)
            
        }
        fetchMyBlogs()
    }, [])
    return (
        <>
            {!isLoading && 
                <div className="font-Custom m-2 p-1">   
                    {blogs.length===0 && <div className="flex justify-center p-10 font-semibold font-Custom">You have not posted any blog yet.</div>}
                    {blogs.map((blog)=>(
                        <div key={blog._id} className="m-2 hover:shadow-xl rounded-lg border border-gray-300 shadow-md">
                            <div className="text-md font-semibold text-center relative">{blog.title}
                            <div className="absolute right-1 top-1 flex">
                                <img src={LIKE_ICON} alt="loading" className="w-[30px] h-[15px] cursor-pointer "/>
                                <img src={EDIT_ICON} alt="loading" className="w-[30px] h-[15px] cursor-pointer" onClick={()=>setEditModal(true)}/>
                                <img src={DELETE_ICON} alt="loading" className="w-[30px] h-[15px] cursor-pointer " onClick={()=>handleDeleteBlog(blog._id)}/>
                                
                                </div> 
                            </div>
                            <div className="flex justify-center ">   
                            {blog.topics.map((top)=>(
                                <div key={top} className="text-[10px] m-1 text-gray-500">
                                    {top}
                                </div>
                            ))}
                            </div>
                            <div className="text-sm text-center text-gray-800 m-1">{blog.description}</div>
                        </div>
                    ))}
                </div>
            }
            {editModal && <div className="absolute top-1/2 left-1/2"><EditModalComponent/></div>}

        </>
    )
}

export default MyBlogDisplay