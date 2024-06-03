// import { useCallback, useRef } from "react"


// export const useInfiniteScroll =(node,skip,setSkip,page,isLoading,hasMore,lastElementRef)=>{
//     const observer = useRef();
//     lastElementRef = useCallback(node=>{
//         if (isLoading) return
//         if (observer.current) observer.current.disconnect();
//         observer.current = new IntersectionObserver(entries=>{
//             if(entries[0].isIntersecting && hasMore){
//                 setSkip(skip=>skip+page);
//             }
//         })
//         if (node) observer.current.observe(node)
//     },[isLoading, hasMore, page]) 
// }