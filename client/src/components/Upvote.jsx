// import { useEffect, useState } from "react"
import { useEffect, useState } from "react"
import { handleUpVote } from "../helpers/helperfunc"
const Upvote = (item) => {
    const [triggerMount, setTriggerMount] = useState(false)
    const [details, setDetails] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        const populateDetails = () => {
            if (details.length===0) {
                setIsLoading(true)
                setDetails(item.item)
                setIsLoading(false)
            }
        }
        populateDetails()
    }, [triggerMount])
    return (
        <>
            { !isLoading && <button className="w-[210px] h-[45px] p-2 bg-red-500 hover:cursor-pointer font-semibold hover:bg-red-700 text-md text-white rounded-lg" onClick={() => {
                handleUpVote(details._id, JSON.parse(localStorage.getItem("userCheckMyIdea")).email)
                setTriggerMount(prev => !prev)
            }
            }>UPVOTE {details.voteCount.length}</button>}
        </>
    )
}
export default Upvote