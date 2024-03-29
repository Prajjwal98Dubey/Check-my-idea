import { useState } from "react"
import { CREATE_BLOG } from "../helpers/backendapi"
import axios from "axios"
const MyBlog = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [topics, setTopics] = useState([])

    const handleCreatePost = async () => {
        await axios.post(CREATE_BLOG, {
            title: title,
            description: description,
            author: JSON.parse(localStorage.getItem("userCheckMyIdea")).email,
            topics: topics
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        setTitle("")
        setDescription("")
        setTopics([])
        setIsOpen(false)
        
    }

    const handleCheckBox = (options) => {
        for (let i = 0; i < topics.length; i++) {
            if (topics[i] === options) return
        }
        setTopics([...topics, options])
    }
    const handleRemoveFromCheckBox = (options) => {
        console.log("here i am")
        for (let i = 0; i < topics.length; i++) {
            if (topics[i] === options) {
                topics.pop(i)
            }
            console.log(topics)
            setTopics([...topics])
        }
    }

    return (
        <>
            <div className="font-Custom flex justify-center p-10 relative"><button className="w-[200px] h-[40px] rounded-lg bg-red-500 cursor-pointer text-white font-semibold hover:bg-red-600" onClick={() => setIsOpen(true)}>Write a blog</button></div>
            {isOpen &&
                <div className="font-Custom z-10 absolute left-1/3 top-[90px] w-[550px] h-[340px] border border-gray-400 shadow-lg rounded-lg bg-white">
                    <div className="flex justify-end">
                        <div className="w-fit h-fit  mr-[5px] mt-[5px] cursor-pointer" onClick={() => setIsOpen(false)}>❌</div>
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <input type="text" placeholder="Write the title of the blog" value={title} onChange={(e) => setTitle(e.target.value)} className="w-[340px] h-[35px] border border-red-300 p-2 m-2 text-sm" />
                            <br />
                            <textarea className="w-[340px] h-[150px] border border-red-300 p-2 m-2 text-sm" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write the description"></textarea>
                            <br />
                            <div className="flex justify-center text-sm">
                                <input className="m-1" type="checkbox" value="Technology" onChange={(e) => {
                                    if (e.target.checked) {
                                        handleCheckBox(e.target.value)
                                    }
                                    else {

                                        handleRemoveFromCheckBox(e.target.value)
                                    }
                                }
                                } />
                                <label htmlFor="technology">Technology</label>
                                <input type="checkbox" className="m-1" value="Software" onChange={(e) => {
                                    if (e.target.checked) {
                                        handleCheckBox(e.target.value)
                                    }
                                    else {

                                        handleRemoveFromCheckBox(e.target.value)
                                    }
                                }
                                } />
                                <label htmlFor="Software">Software</label>
                                <input className="m-1" type="checkbox" value="Hardware" onChange={(e) => {
                                    if (e.target.checked) {
                                        handleCheckBox(e.target.value)
                                    }
                                    else {

                                        handleRemoveFromCheckBox(e.target.value)
                                    }
                                }
                                } />
                                <label htmlFor="Hardware">Hardware</label>
                                <input className="m-1" type="checkbox" value="Finance" onChange={(e) => {
                                    if (e.target.checked) {
                                        handleCheckBox(e.target.value)
                                    }
                                    else {

                                        handleRemoveFromCheckBox(e.target.value)
                                    }
                                }
                                } />
                                <label htmlFor="Finance">Finance</label>
                                <input className="m-1" type="checkbox" value="other" onChange={(e) => {
                                    if (e.target.checked) {
                                        handleCheckBox(e.target.value)
                                    }
                                    else {

                                        handleRemoveFromCheckBox(e.target.value)
                                    }
                                }
                                } />
                                <label htmlFor="other">Other</label>
                            </div>
                            <br />
                            <div className="flex justify-center">
                                <button className="w-[100px] h-[30px] rounded-lg bg-blue-500 hover:bg-blue-600 font-semibold text-white cursor-pointer" onClick={() => handleCreatePost()}>Post</button>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default MyBlog