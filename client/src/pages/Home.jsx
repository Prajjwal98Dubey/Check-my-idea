
// import MainBlogsPage from "../components/MainBlogsPage"
// import Navbar from "../components/Navbar"
// import ProductDisplay from "../components/ProductDisplay"

import { lazy,Suspense } from "react"
const ProductDisplay = lazy(()=>import("../components/ProductDisplay"))
const Navbar = lazy(()=>import("../components/Navbar"))
const MainBlogsPage = lazy(()=>import("../components/MainBlogsPage"))
const Home = () => {
  return (
    <>
    <Suspense fallback={<h2>Loading...</h2>}><Navbar/></Suspense>
    <div className="flex">
    <div className="w-1/2 ml-[60px] mt-[20px] h-full">
        <div className="font-Custom font-semibold text-lg">Products</div>
        <Suspense fallback={<h2>Loading...</h2>}><ProductDisplay/></Suspense>
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