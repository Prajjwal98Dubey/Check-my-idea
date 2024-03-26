import {Link} from 'react-router-dom'
const Navbar = ()=>{
    return (
        <>
        <div className="h-[65px] bg-[#8d48c2] flex justify-between items-center"> 
            <Link to='/'><div className="font-Cursive font-bold text-white text-xl p-2 min-w-fit min-h-min hover:underline">check-my-idea</div></Link>
            <div className='w-[400px] flex justify-between'>
            <Link to="/share-my-idea">
            <div className="font-Cursive font-bold text-white text-xl p-2 hover:underline cursor-pointer">Share You Idea</div>
            </Link>
            <div className='flex justify-center items-center mr-[5px]'>
                {localStorage.getItem('userCheckMyIdea') ? <Link to="/my-profile">
                <div className='w-fit h-fit'><img className='w-[40px] h-[40px] rounded-full' src={JSON.parse(localStorage.getItem("userCheckMyIdea")).photoUrl} alt="loading" loading="lazy" /></div>
                </Link>:
                 <Link to="/login"><button className='w-[120px] h-[35px] bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-Cursive cursor-pointer'>Login</button></Link>}
                </div>
            
            </div>
        </div>
        </>
    )
}
export default Navbar