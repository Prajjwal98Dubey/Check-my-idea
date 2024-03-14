import {Link} from 'react-router-dom'
const Navbar = ()=>{
    return (
        <>
        <div className="h-[65px] bg-[#8d48c2] flex justify-between items-center"> 
            <div className="font-Cursive font-bold text-white text-xl p-2">check-my-idea</div>
            <Link to="/share-my-idea">
            <div className="font-Cursive font-bold text-white text-xl p-2 hover:underline cursor-pointer">Share You Idea</div>
            </Link>
        </div>
        </>
    )
}


export default Navbar