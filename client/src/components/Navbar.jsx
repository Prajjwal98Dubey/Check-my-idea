import { Link } from 'react-router-dom'
import { SEARCH_BAR_ICON } from '../helpers/icons'
import { useMemo, useState } from 'react'
import axios from 'axios'
import { GET_SEARCH_RESULT } from '../helpers/backendapi'
import { config } from '../helpers/config'
const Navbar = () => {
    const [searchText, setSearchText] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getSearchResult = async (searchText) => {
        setIsLoading(true)
        const { data } = await axios.get(GET_SEARCH_RESULT + `?s=${searchText}`, config)
        setSearchResult(data)
        setIsLoading(false)
    }
    const debounce = (cb, delay) => {
        let timer;
        return (...args) => {
            console.log("API calling....",searchText)
            clearTimeout(timer)
            timer = setTimeout(() => cb(...args), delay)
        }
    }
    const updateDebounce = useMemo(() => debounce(getSearchResult, 250), [])
    return (
        <>
            <div className="h-[65px] bg-[#8d48c2] flex justify-around items-center font-Custom">
                <Link to='/'><div className="font-Cursive font-bold text-white text-xl p-2 min-w-fit min-h-min hover:underline">check-my-idea</div></Link>
                <div className='flex justify-center m-1 relative'>
                    <img src={SEARCH_BAR_ICON} alt="loading" loading='lazy' className='w-[24px] h-[24px] absolute right-1 top-[7px]' />
                    <input type="text" className='w-[450px] h-[38px] mt-[3px] rounded-lg border border-blue-700 p-2' value={searchText} onChange={(e) => 
                        {
                            setSearchText(e.target.value)
                            updateDebounce(e.target.value)
                        }
                        } placeholder='Search for People, Ideas and More' />
                    {searchText && <div className='absolute top-[42px] bg-white text-black w-[450px] rounded-lg h-fit border border-gray-400'>
                        <ul>
                            {
                                !isLoading &&
                                <>
                                    {searchResult.users.map((search, index) => (
                                        <li key={index} className='p-1 font-semibold hover:bg-gray-400 hover:cursor-pointer m-1 rounded-lg'>{search.email}</li>
                                    ))}
                                    {searchResult.products.map((search, index) => (
                                        <li key={index} className='p-1 font-semibold hover:bg-gray-400 hover:cursor-pointer m-1 rounded-lg'>{search.name}</li>
                                    ))}
                                </>
                            }
                            {/* <li className='p-1 font-semibold hover:bg-gray-400 hover:cursor-pointer m-1 rounded-lg'>this is it.</li> */}

                        </ul>
                    </div>}
                </div>
                <Link to="/share-my-idea">
                    <div className="font-Cursive font-bold text-white text-xl p-2 hover:underline cursor-pointer">Share You Idea</div>
                </Link>
                <div className='flex justify-center items-center mr-[5px]'>
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