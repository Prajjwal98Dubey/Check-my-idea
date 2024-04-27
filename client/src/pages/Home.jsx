
// import MainBlogsPage from "../components/MainBlogsPage"
// import Navbar from "../components/Navbar"
// import ProductDisplay from "../components/ProductDisplay"

import { lazy,Suspense, useState } from "react"
const ProductDisplay = lazy(()=>import("../components/ProductDisplay"))
const Navbar = lazy(()=>import("../components/Navbar"))
const MainBlogsPage = lazy(()=>import("../components/MainBlogsPage"))
const Pagination  = lazy(()=>import("../components/Pagination"))
const Home = () => {
  const[skip,setSkip] = useState(0)
  return (
    <>
    {console.log(skip)}
    <Suspense fallback={<h2>Loading...</h2>}><Navbar/></Suspense>
    <div className="flex">
    <div className="w-1/2 ml-[60px] mt-[20px] h-full">
        <div className="font-Custom font-semibold text-lg">Products</div>
        <Suspense fallback={<h2>Loading...</h2>}>
          <ProductDisplay skip={skip} />
          <div className="flex justify-center m-2">
                <Pagination skip={skip} setSkip={setSkip}/>
            </div>
          </Suspense>
    </div>    
    <div className="w-1/2 ml-[60px] mt-[20px] h-full font-Custom ">
        <div className="text-center text-xl font-bold">Blog</div>
    <Suspense fallback={<h2>Loading...</h2>}><MainBlogsPage/></Suspense>
    </div>
    </div>
    </>
  )
}

export default Home