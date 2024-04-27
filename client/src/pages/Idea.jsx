import { useEffect, useRef, useState } from "react"
// import Navbar from "../components/Navbar"
import { useSearchParams, Link } from "react-router-dom"
import axios from "axios"
import { ADD_NEW_COMMENT, GET_ALL_COMMENTS, GET_SINGLE_PRODUCT } from "../helpers/backendapi"
import { config } from "../helpers/config"
// import Comments from "../components/Comments"
import { handleUpVote } from "../helpers/helperfunc"
// import CommentShimmer from "../shimmers/CommentShimmer"
// import IdeaShimmer from "../shimmers/IdeaShimmer"
import {lazy,Suspense} from 'react'

const Navbar = lazy(()=>import("../components/Navbar"))
const Comments = lazy(()=>import("../components/Comments"))
const CommentShimmer = lazy(()=>import("../shimmers/CommentShimmer"))
const IdeaShimmer = lazy(()=>import("../shimmers/IdeaShimmer"))


const Idea = () => {
  const [item, setItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchParam] = useSearchParams()
  const [userComment, setUserComment] = useState("")
  const [allcomments, setAllComments] = useState([])
  const [loadComments, setLoadComments] = useState(true)
  const [triggerMount, setTriggerMount] = useState(false)
  const singleProductRef = useRef(false)
  useEffect(() => {
    console.log("triggerMount changed:", triggerMount);
    if(singleProductRef.current) return 
    const getSingleProduct = async () => {
      const { data } = await axios.get(GET_SINGLE_PRODUCT + searchParam.get("id"), config)
      singleProductRef.current = true
      console.log("Single Product API call.")
      setItem(data)
      setIsLoading(false)
    }
    const getAllComments = async () => {
      setLoadComments(true)
      const { data } = await axios.get(GET_ALL_COMMENTS + searchParam.get("id"), config)
      // console.log("fetching all comments",data);
      setAllComments(data)
      setLoadComments(false)
    }
    getSingleProduct()
    getAllComments()
  }, [triggerMount,searchParam])
  const handleCommentBtn = async () => {
    await axios.post(ADD_NEW_COMMENT, {
      user: JSON.parse(localStorage.getItem("userCheckMyIdea")).email,
      comment: userComment,
      productId: searchParam.get("id")
    }, config)
    setTriggerMount(prev=>!prev)
    setUserComment("")
  }
  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}><Navbar /></Suspense>
      <div className="flex justify-center mt-[10px]">
        <div className="w-[1000px]">
          {isLoading ? <Suspense fallback={<h2>Loading...</h2>}><IdeaShimmer/></Suspense> :
            <>
              <div className="font-Custom flex justify-between">
                <div>
                  <div><img src={item.logo} className="w-[120px] h-[80px] rounded-lg border border-gray-300 m-2" alt="loading" loading="lazy" /></div>
                  <div className="font-bold text-xl m-2">{item.name}</div>
                  <div className="text-gray-600 m-2">{item.shortDescription}</div>
                </div>
                <div className="flex items-center justify-evenly w-[400px]" >
                  <Link to={"/my-web?name=" + item.name}><button className="w-[210px] h-[45px] border border-gray-400  hover:border-red-400 hover:cursor-pointer mr-[3px] font-semibold rounde d-lg">Visit</button></Link>
                  {/* {/* <Upvote item={item}/> */}
                  <button className="w-[210px] h-[45px] p-2 bg-red-500 hover:cursor-pointer font-semibold hover:bg-red-700 text-md text-white rounded-lg" onClick={() => {
                    handleUpVote(searchParam.get("id"), JSON.parse(localStorage.getItem("userCheckMyIdea")).email)
                  }
                    }>UPVOTE {item.voteCount.length}</button>
                    </div>
              </div>
              <div className="m-2 font-Custom">
                <div className="text-gray-800">{item.longDescription}</div>
                <div className="flex">
                  <div className="text-gray-600 mt-2 ">Launced in -</div>
                  {item.keywords.map((word) => (
                    <div key={word} className="w-fit h-fit p-1 mt-[7px] ml-[2px] mr-[2px] text-gray-600 text-sm ">
                      {word}
                    </div>
                  ))}
                </div>
              </div>
              <Link to={`/user-profile?uid=${item.founder}`}><div className="m-2">
                <div className="font-semibold">Creator - <span className="text-blue-700 hover:underline hover:cursor-pointer">{item.founder}</span></div>
              </div></Link>
              <div className="m-2 font-Custom">
                <div className="text-gray-800 text-xl">Express Your Opinion</div>
                <div className="flex font-Custom">
                  <input type="text" value={userComment} onChange={(e) => setUserComment(e.target.value)} className="w-[850px] h-[45px] border border-gray-400 p-2 font-Cursive rounded-l-lg" />
                  <div><button className="w-[150px] h-[45px] bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:cursor-pointer rounded-r-lg" onClick={handleCommentBtn}>Comment</button></div>
                </div>
                {
                  item.founderMessage && <div className="bg-green-300 rounded-lg m-1">
                    <div className="font-semibold">Founders Message:</div>
                    <div className="p-1 ">
                      <div className="flex">
                        <div className="w-[40px] h-[40px] rounded-full bg-pink-400 text-white font-semibold flex justify-center items-center">{item.founder.charAt(0).toUpperCase()}</div>
                        <div className="ml-[3px] flex justify-center items-center text-gray-800">
                          <div>
                            <div className="font-semibold text-sm">{item.founder}</div>
                            <div className="text-sm">{item.founderMessage}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {loadComments ? <Suspense fallback={<h2>Loading...</h2>}><CommentShimmer/></Suspense> :
                <>
                <div className="m-1"><Suspense fallback={<h2>Loading...</h2>}><Comments commentlist={allcomments} /></Suspense></div></>}
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}
export default Idea