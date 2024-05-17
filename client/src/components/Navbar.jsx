import { Link } from 'react-router-dom'
import { SEARCH_BAR_ICON } from '../helpers/icons'
import { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { ADD_MY_SEARCH_HISTORY, GET_MY_SEARCH_HISTORY, GET_SEARCH_RESULT } from '../helpers/backendapi'
import { config } from '../helpers/config'
import { ProductContext } from '../contexts/productContexts'
const Navbar = () => {
    const [searchText, setSearchText] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userHistoryResult, setUserHistoryResult] = useState([])
    const [userHistoryLoading, setUserHistoryLoading] = useState(true)
    // const [searchBarModal, setSearchBarModel] = useState(false)
    const productContext = useContext(ProductContext)
    useEffect(() => {
        const getMySearchResult = async () => {
            const { data } = await axios.get(GET_MY_SEARCH_HISTORY + `?email=${JSON.parse(localStorage.getItem("userCheckMyIdea")).email}`, config)
            setUserHistoryResult(data)
            setUserHistoryLoading(false)
        }
        getMySearchResult()
    }, [])
    const getSearchResult = async (searchText) => {
        setIsLoading(true)
        if (searchText) {
            const { data } = await axios.get(GET_SEARCH_RESULT + `?s=${searchText}`, config)
            setSearchResult(data)
            setIsLoading(false)
        }
        else{
            setSearchResult([])
            setIsLoading(false)
        }
    }
    const debounce = (cb, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => cb(...args), delay)
        }
    }
    const updateDebounce = useMemo(() => debounce(getSearchResult, 250), [])
    const handleUserSearchHistory = async (prodId) => {
        await axios.post(ADD_MY_SEARCH_HISTORY, {
            email: JSON.parse(localStorage.getItem("userCheckMyIdea")).email,
            searchQuery: prodId
        }, config)
    }
    return (
        <>
            {console.log("this is the context in the navbar",productContext)}
            <div className="h-[65px] bg-[#8d48c2] flex justify-around items-center font-Custom">
                <Link to='/'><div className="font-Cursive font-bold text-white text-xl p-2 min-w-fit min-h-min hover:underline" onClick={()=>productContext.setSearchBarModal(false)}>check-my-idea</div></Link>
                <div className='z-10 flex justify-center m-1 relative'>
                    <img src={SEARCH_BAR_ICON} alt="loading" loading='lazy' className='w-[24px] h-[24px] absolute right-1 top-[7px]' />
                    <input type="text" className='w-[450px] h-[38px] mt-[3px] rounded-lg border border-blue-700 p-2' value={searchText} onClick={() => {
                        productContext.setSearchBarModal(true)
                        console.log("Clicked in the input.")
                    }
                    } onChange={(e) => {
                        setSearchText(e.target.value)
                        updateDebounce(e.target.value)
                    }
                    } placeholder='Search for People, Ideas and More' />
                    {(searchText || productContext.searchBarModal) && <div className='absolute top-[42px] bg-white text-black w-[450px] rounded-lg h-fit border border-gray-400'>
                        <ul>
                            {!userHistoryLoading && productContext.searchBarModal && userHistoryResult && userHistoryResult.map((item) => (
                                <>
                                    <Link key={item._id} to={"/idea?id=" + item._id}><li className='p-1 font-semibold hover:bg-gray-400 hover:cursor-pointer m-1 rounded-lg text-blue-600' onClick={() =>productContext.setSearchBarModal(false)}>{item.name}</li></Link></>
                            ))}

                            {
                                !isLoading &&
                                <>
                                    {searchResult.users && searchResult.users.map((search, index) => (
                                        <>
                                            <Link key={index} to={"/user-profile?uid=" + search.email}>
                                                <li className='p-1 font-semibold hover:bg-gray-400 hover:cursor-pointer m-1 rounded-lg'>{search.email}</li></Link>
                                        </>
                                    ))}
                                    {searchResult.products && searchResult.products.map((search, index) => (
                                        <>
                                            <Link key={index} to={"/idea?id=" + search._id}><li className='p-1 font-semibold hover:bg-gray-400 hover:cursor-pointer m-1 rounded-lg' onClick={() => 
                                            {
                                                handleUserSearchHistory(search._id)
                                                productContext.setSearchBarModal(false)
                                            }
                                            }>{search.name}</li></Link></>
                                    ))}
                                </>
                            }
                            {/* <li className='p-1 font-semibold hover:bg-gray-400 hover:cursor-pointer m-1 rounded-lg'>this is it.</li> */}

                        </ul>
                    </div>}
                </div>
                <Link to="/share-my-idea">
                    <div className="font-Cursive font-bold text-white text-xl p-2 hover:underline cursor-pointer" onClick={()=>productContext.setSearchBarModal(false)}>Share You Idea</div>
                </Link>
                <div className='flex justify-center items-center mr-[5px]' onClick={()=>productContext.setSearchBarModal(false)}>
                    {localStorage.getItem('userCheckMyIdea') ? <Link to="/my-profile">
                        <div className='w-fit h-fit'><img className='w-[40px] h-[40px] rounded-full' src={JSON.parse(localStorage.getItem("userCheckMyIdea")).photoUrl} alt="loading" loading="lazy" /></div>
                    </Link> :
                        <Link to="/login"><button className='w-[120px] h-[35px] bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-Cursive cursor-pointer'>Login</button></Link>}
                </div>


            </div>
        </>
    )
}
export default Navbar