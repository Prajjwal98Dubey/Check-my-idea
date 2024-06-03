/* eslint-disable react/prop-types */
import { Suspense, lazy, useCallback, useContext, useEffect, useRef, useState } from "react"
import { GET_ALL_PRODUCT_INSTANT } from "../helpers/backendapi"
import { config } from "../helpers/config"
import axios from "axios"
import { COMMENT_ICON, FULL_STOP, UPVOTE_ICON_IMG } from "../helpers/icons"
import { ProductContext } from "../contexts/productContexts"
import { Link } from 'react-router-dom'
import { handleUpVote } from "../helpers/helperfunc"
const MainProductShimmer = lazy(() => import("../shimmers/MainProductShimmer"))

const ProductDisplay = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [skip, setSkip] = useState(0)
    const [productLeft, setProductLeft] = useState(true)
    const newProductContext = useContext(ProductContext)
    const observer =  useRef();
    const lastElementRef = useCallback(node=>{
        console.log(node)
        if (isLoading) return
        if (observer.current) observer.current.disconnect();
        observer.current  = new IntersectionObserver(entries=>{
            if (entries[0].isIntersecting && productLeft){
                setSkip(skip=>skip+5);
            }
        })
        if (node) observer.current.observe(node)
    },[isLoading,productLeft]);
    const getProducts = async () => {
        const { data } = await axios.get(GET_ALL_PRODUCT_INSTANT + `?skip=${skip}`, config)
        const { items, itemLeft } = data
        setProducts([...products, ...items])
        setProductLeft(itemLeft)
        setIsLoading(false)
        newProductContext.setMainProducts([...products, ...items])
    }
    useEffect(() => {
        getProducts()
    }, [skip])
    return (
        <>
            {isLoading ?
                <Suspense fallback={<h2>Loading...</h2>}><MainProductShimmer /></Suspense> :
                products.map((prod,index) => {
                    if (products.length===index+1){
                        return <div ref={lastElementRef} key={prod._id}>
                        <Link to={"/idea?id=" + prod._id}>
                            <div className="flex justify-between p-2 hover:bg-green-200 cursor-pointer rounded-lg font-Custom">
                                <div><img className="w-[70px] h-[70px] rounded-lg" src={prod.logo} alt="loading" loading="lazy" /></div>
                                <div>
                                    <div className="mt-[3px]">
                                        <span className="text-md font-semibold">{prod.name}</span>
                                        <span className="text-xl text-gray-400 ml-[1px] mr-[1px]">-</span>
                                        <span className="text-sm">{prod.shortDescription}</span>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="flex justify-start">
                                            <div><img className="w-[10px] h-[10px] mt-[3px]" src={COMMENT_ICON} alt="loading" loading="lazy" /></div>
                                            {prod.keywords.map((p, index) => (
                                                <div key={index}>
                                                    <div className="text-gray-700 flex justify-around text-[10px]">
                                                        <img src={FULL_STOP} alt="loading" loading="lazy" className="w-[15px] h-[15px]" />
                                                        <div>{p}</div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[5px]">
                                    <img src={UPVOTE_ICON_IMG} className=" z-10 w-[20px] h-[20px] cursor-pointer hover:scale-110" alt="loading" loading="lazy" onClick={() => handleUpVote(prod._id, JSON.parse(localStorage.getItem("userCheckMyIdea")).email)} />
                                    <div className="flex justify-center pt-[2px] text-gray-400 font-semibold text-sm">{prod.voteCount.length}</div>
                                </div>
                            </div>
                        </Link>

                    </div>
                    }
                    else{

                    return <div key={prod._id}>
                        <Link to={"/idea?id=" + prod._id}>
                            <div className="flex justify-between p-2 hover:bg-green-200 cursor-pointer rounded-lg font-Custom">
                                <div><img className="w-[70px] h-[70px] rounded-lg" src={prod.logo} alt="loading" loading="lazy" /></div>
                                <div>
                                    <div className="mt-[3px]">
                                        <span className="text-md font-semibold">{prod.name}</span>
                                        <span className="text-xl text-gray-400 ml-[1px] mr-[1px]">-</span>
                                        <span className="text-sm">{prod.shortDescription}</span>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="flex justify-start">
                                            <div><img className="w-[10px] h-[10px] mt-[3px]" src={COMMENT_ICON} alt="loading" loading="lazy" /></div>
                                            {prod.keywords.map((p, index) => (
                                                <div key={index}>
                                                    <div className="text-gray-700 flex justify-around text-[10px]">
                                                        <img src={FULL_STOP} alt="loading" loading="lazy" className="w-[15px] h-[15px]" />
                                                        <div>{p}</div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[5px]">
                                    <img src={UPVOTE_ICON_IMG} className=" z-10 w-[20px] h-[20px] cursor-pointer hover:scale-110" alt="loading" loading="lazy" onClick={() => handleUpVote(prod._id, JSON.parse(localStorage.getItem("userCheckMyIdea")).email)} />
                                    <div className="flex justify-center pt-[2px] text-gray-400 font-semibold text-sm">{prod.voteCount.length}</div>
                                </div>
                            </div>
                        </Link>

                    </div>
                    }
})
            }
            {/* {!isLoading && productLeft &&
                <div className="p-1 m-1"><button className="w-[570px] h-[40px] text-center bg-[#313131] hover:bg-gray-800 text-white  rounded-lg font-semibold" onClick={() => setSkip(skip + 5)}>LOAD MORE...</button></div>

            } */}
        </>
    )
}

export default ProductDisplay