import axios from "axios"
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react"
import { GET_ALL_BLOGS } from "../helpers/backendapi"
import { LIKE_ICON } from "../helpers/icons"
// import MainBlogShimmer from "../shimmers/MainBlogShimmer"

const MainBlogShimmer = lazy(() => import("../shimmers/MainBlogShimmer"))

const MainBlogsPage = () => {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [skip, setSkip] = useState(0)
    const [blogLeft, setBlogLeft] = useState(true)
    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && blogLeft) {
                setSkip(skip => skip + 5);
            }
        })
        if (node) observer.current.observe(node)
    }, [isLoading, blogLeft])
    useEffect(() => {
        const getAllBlogs = async () => {
            const { data } = await axios.get(GET_ALL_BLOGS + `?skip=${skip}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const { finalBlogs, blogLeft } = data
            setBlogs([...blogs, ...finalBlogs])
            setBlogLeft(blogLeft)
            setIsLoading(false)
        }
        getAllBlogs()
    }, [skip])
    return (
        <>
        {console.log(blogs)}
            {isLoading ? <Suspense fallback={<h2>Loading...</h2>}><MainBlogShimmer /></Suspense> :
                <>
                    <div className="font-Custom m-2 p-1">
                        {blogs.map((child, index) => {
                            if (blogs.length == index + 1) {
                                return <div ref={lastElementRef}  key={child.blog._id} className="m-2 hover:shadow-xl rounded-lg border border-gray-300 shadow-md">
                                    <div className="text-md font-semibold text-center relative">{child.blog.title}
                                        <div className="absolute right-1 top-1 flex">
                                            <img src={LIKE_ICON} alt="loading" className="w-[30px] h-[15px] cursor-pointer " />
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="flex text-gray-500 text-sm">
                                            <span className="m-1">by {child.user.email}</span>

                                            {child.user.isFounder && <span className="bg-green-300 text-[9px] m-1  rounded-lg w-[50px] h-[20px] text-center text-black">Founder</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-center ">
                                        {child.blog.topics.map((top) => (
                                            <div key={top} className="text-[10px] m-1 text-gray-500">
                                                {top}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm text-center text-gray-800 m-1">{child.blog.description}</div>
                                </div>
                            }
                            else {
                                return <div key={child.blog._id} className="m-2 hover:shadow-xl rounded-lg border border-gray-300 shadow-md">
                                    <div className="text-md font-semibold text-center relative">{child.blog.title}
                                        <div className="absolute right-1 top-1 flex">
                                            <img src={LIKE_ICON} alt="loading" className="w-[30px] h-[15px] cursor-pointer " />
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="flex text-gray-500 text-sm">
                                            <span className="m-1">by {child.user.email}</span>

                                            {child.user.isFounder && <span className="bg-green-300 text-[9px] m-1  rounded-lg w-[50px] h-[20px] text-center text-black">Founder</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-center ">
                                        {child.blog.topics.map((top) => (
                                            <div key={top} className="text-[10px] m-1 text-gray-500">
                                                {top}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm text-center text-gray-800 m-1">{child.blog.description}</div>
                                </div>
                            }

                        })}
                    </div>
                    {/* {!isLoading && blogLeft && <div className="flex justify-center m-2 p-1"><button className="w-[500px] h-[40px] text-white bg-[#313131] hover:bg-gray-800 rounded-md font-semibold " onClick={() => setSkip(skip + 5)}>Load More...</button></div>
                    } */}
                </>
            }
        </>
    )
}

export default MainBlogsPage