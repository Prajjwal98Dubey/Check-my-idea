import { useEffect,useState } from "react"
import { GET_ALL_PRODUCT } from "../helpers/backendapi"
import { config } from "../helpers/config"
import axios from "axios"
import { COMMENT_ICON, FULL_STOP, UPVOTE_ICON_IMG } from "../helpers/icons"

const ProductDisplay = () => {
    const[products,setProducts] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    const getProducts = async () => {
        const {data} = await axios.get(GET_ALL_PRODUCT, config)
        setProducts(data)
        setIsLoading(false)
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
            { isLoading ? <div>Loading...</div>:
                    products.map((prod)=>(
                        <>
                            <div key={prod._id} className="flex justify-between p-2 hover:bg-green-200 cursor-pointer rounded-lg font-Custom">
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
                                        {prod.keywords.map((p)=>(
                                            <>
                                            <div className="text-gray-700 flex justify-around text-[10px]">
                                                <img src={FULL_STOP} alt="loading" loading="lazy" className="w-[15px] h-[15px]" />
                                                <div>{p}</div>
                                            </div>
                                            </>
                                        ))}
                                        
                                    </div>
                                    </div>
                                </div>
                                <div className="mt-[5px]">
                                    <img src={UPVOTE_ICON_IMG} className="w-[20px] h-[20px] cursor-pointer hover:scale-110" alt="loading" loading="lazy" />
                                    <div className="flex justify-center pt-[2px] text-gray-400 font-semibold text-sm">{prod.voteCount}</div>
                                </div>

                            </div>
                        </>
                    ))
            }
        </>
    )
}

export default ProductDisplay