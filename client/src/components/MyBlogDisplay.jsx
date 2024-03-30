/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { DELETE_MY_BLOG, EDIT_BLOG, GET_MY_BLOGS } from "../helpers/backendapi"
import { CLOSE_ICONS, DELETE_ICON, EDIT_ICON, LIKE_ICON } from "../helpers/icons"

const MyBlogDisplay = ({ newBlogMount }) => {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editModal, setEditModal] = useState(false)
    const [editedTitle, setEditedTitle] = useState("")
    const [editeDescription, setEditedDescription] = useState("")
    const [editBlogId, setEditBlogId] = useState("")
    const [triggerMount, setTriggerMount] = useState(false)
    const handleDeleteBlog = async (id) => {
        setTriggerMount(prev => !prev)
        await axios.delete(DELETE_MY_BLOG + id, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    const handleEditBlog = async () => {
        await axios.put(EDIT_BLOG, {
            updatedTitle: editedTitle,
            updatedDescription: editeDescription,
            blogId: editBlogId
        }, {
            headers: {
                'Content-Type': "application/json"
            }
        })
        setTriggerMount(prev => !prev)

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
    }, [triggerMount, newBlogMount])
    return (
        <>
            {!isLoading &&
                <div className="font-Custom m-2 p-1">
                    {blogs.length === 0 && <div className="flex justify-center p-10 font-semibold font-Custom">You have not posted any blog yet.</div>}
                    {blogs.map((blog) => (
                        <div key={blog._id} className="m-2 hover:shadow-xl rounded-lg border border-gray-300 shadow-md">
                            <div className="text-md font-semibold text-center relative">{blog.title}
                                <div className="absolute right-1 top-1 flex">
                                    <img src={LIKE_ICON} alt="loading" className="w-[30px] h-[15px] cursor-pointer " />
                                    <img src={EDIT_ICON} alt="loading" className="w-[30px] h-[15px] cursor-pointer" onClick={() => {
                                        setEditedTitle(blog.title)
                                        setEditedDescription(blog.description)
                                        setEditBlogId(blog._id)
                                        setEditModal(true)
                                    }
                                    } />
                                    <img src={DELETE_ICON} alt="loading" className="w-[30px] h-[15px] cursor-pointer " onClick={() => handleDeleteBlog(blog._id)} />

                                </div>
                            </div>
                            <div className="flex justify-center ">
                                {blog.topics.map((top) => (
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
            {editModal &&
                <div className="absolute top-1/2 left-1/2">
                    <div className="w-[550px] h-[380px] z-10 bg-white rounded-lg border border-gray-400">
                        <div className="flex justify-end">
                            <img src={CLOSE_ICONS} alt="loading" className="w-[25px] h-[15px] cursor-pointer m-1" onClick={() => setEditModal(false)} />
                        </div>
                        <div>
                            <div className="flex justify-center">
                                <input type="text" className="w-[350px] h-[45px] m-1 rounded-lg border border-gray-500" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                            </div>
                            <div className="flex justify-center">
                                <textarea type="text" className="w-[350px] m-1 h-[250px] rounded-lg border border-gray-500" value={editeDescription} onChange={(e) => setEditedDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="flex justify-center"><button className="w-[90px] h-[30px]
        bg-red-600 hover:bg-red-500 hover:cursor-pointer rounded-lg font-semibold text-white" onClick={() => handleEditBlog()}>Edit</button></div>
                    </div>
                </div>}
        </>
    )
}

export default MyBlogDisplay