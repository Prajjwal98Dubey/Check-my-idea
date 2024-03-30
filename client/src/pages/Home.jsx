
import MainBlogsPage from "../components/MainBlogsPage"
import Navbar from "../components/Navbar"
import ProductDisplay from "../components/ProductDisplay"
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="flex">
    <div className="w-1/2 ml-[60px] mt-[20px] h-full">
        <div className="font-Custom font-semibold text-lg">Products</div>
        <ProductDisplay/>
    </div>    
    <div className="w-1/2 ml-[60px] mt-[20px] h-full font-Custom ">
        <div className="text-center text-xl font-bold">Blog</div>
    <MainBlogsPage/>
    </div>
    </div>
    </>
  )
}

export default Home