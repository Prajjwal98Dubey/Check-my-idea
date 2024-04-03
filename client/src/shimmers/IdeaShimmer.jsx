import CommentShimmer from "./CommentShimmer"

const IdeaShimmer = () => {
  return (
    <div className="p-4">
        <div className="flex justify-between">
            <div>
                <div className="w-[120px] h-[80px] rounded-lg bg-gray-200 animate-pulse m-1"></div>
                <div className="w-[120px] h-[15px] rounded-lg bg-gray-200 animate-pulse m-1"></div>
                <div className="w-[300px] h-[15px] rounded-lg bg-gray-200 animate-pulse m-1"></div>
            </div>
            <div className="flex m-2">
                    <div className="w-[210px] h-[45px] rounded-lg bg-gray-200 animate-pulse m-1"></div>
                    <div className="w-[210px] h-[45px] rounded-lg bg-gray-200 animate-pulse m-1"></div>
            </div>
        </div>
            <div className="mt-[25px]">
            <div className="w-[834px] h-[15px] bg-gray-200 rounded-lg  animate-pulse m-1">
            </div>
            <div className="w-[750px] h-[15px] bg-gray-200 rounded-lg  animate-pulse m-1">
            </div>
            <div className="w-[750px] h-[15px] bg-gray-200 rounded-lg  animate-pulse m-1">
            </div>
            <div className="w-[700px] h-[15px] bg-gray-200 rounded-lg  animate-pulse m-1">
            </div>
            </div>
        <div className="mt-[50px] w-[834px] h-[45px] bg-gray-200 rounded-lg animate-pulse"></div>
        <CommentShimmer/>
    </div>
  )
}

export default IdeaShimmer


//210 45