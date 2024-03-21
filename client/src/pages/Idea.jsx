import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { ADD_NEW_COMMENT, GET_ALL_COMMENTS, GET_SINGLE_PRODUCT } from "../helpers/backendapi"
import { config } from "../helpers/config"
import Comments from "../components/Comments"

const Idea = () => {
    const[item,setItem]=useState([])
    const[isLoading,setIsLoading] = useState(true)
    const [searchParam]  = useSearchParams()
    const[userComment,setUserComment] = useState("")
    const[allcomments,setAllComments] = useState([])
    const[loadComments,setLoadComments] = useState(true)
    const handleCommentBtn=async()=>{
        await axios.post(ADD_NEW_COMMENT,{
          user:JSON.parse(localStorage.getItem("userCheckMyIdea")).email,
          comment:userComment,
          productId:searchParam.get("id")
        },config)
        setUserComment("")
    }
    const getSingleProduct = async()=>{
      const { data } = await axios.get(GET_SINGLE_PRODUCT + searchParam.get("id"),config)
      setItem(data)
      setIsLoading(false)
    }
    const getAllComments=async()=>{
      const {data} = await axios.get(GET_ALL_COMMENTS+searchParam.get("id"),config)
      setAllComments(data)
      setLoadComments(false)
    }
    useEffect(()=>{
        getSingleProduct()
        getAllComments()
    },[])
  return (
    <>
        <Navbar/>
        <div className="flex justify-center mt-[10px]">
        <div className="w-[1000px]">
            {!isLoading && 
              <>
              <div className="font-Custom flex justify-between">
                <div>
                <div><img src={item.logo} className="w-[120px] h-[80px] rounded-lg border border-gray-300 m-2" alt="loading" loading="lazy" /></div>
                <div className="font-bold text-xl m-2">{item.name}</div>
                <div className="text-gray-600 m-2">{item.shortDescription}</div>
                </div>
                <div className="flex items-center"><button className="w-[210px] h-[45px] p-2 bg-red-500 hover:cursor-pointer font-semibold hover:bg-red-700 text-md text-white rounded-lg">UPVOTE {item.voteCount}</button></div>
              </div>
              <div className="m-2 font-Custom">
              <div className="text-gray-800">{item.longDescription}</div>
              <div className="flex">
                <div className="text-gray-600 mt-2 ">Launced in -</div>
                {item.keywords.map((word)=>(
                  <div key={word} className="w-fit h-fit p-1 mt-[7px] ml-[2px] mr-[2px] text-gray-600 text-sm ">
                      {word}
                  </div>
                ))}
              </div>
              </div>
              <div className="m-2 font-Custom">
                <div className="text-gray-800 text-xl">Express Your Opinion</div>
                <div className="flex font-Custom">
                  <input type="text" value={userComment} onChange={(e)=>setUserComment(e.target.value)} className="w-[850px] h-[45px] border border-gray-400 p-2 font-Cursive rounded-l-lg" />
                  <div><button className="w-[150px] h-[45px] bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:cursor-pointer rounded-r-lg" onClick={handleCommentBtn}>Comment</button></div>
                </div>
                {!loadComments && <div className="m-1"><Comments commentlist={allcomments}/></div>}
              </div>
              </>
            }
        </div>
        </div>
    </>
  )
}

export default Idea