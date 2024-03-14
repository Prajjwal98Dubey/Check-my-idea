import Navbar from "../components/Navbar"
import ProductDisplay from "../components/ProductDisplay"


const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="w-1/2 ml-[60px] mt-[20px] h-full">
        <div className="font-Custom font-semibold text-lg">Products</div>
        <ProductDisplay/>
    </div>    
    </>
  )
}

export default Home