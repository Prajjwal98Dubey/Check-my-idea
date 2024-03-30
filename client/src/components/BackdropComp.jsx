/* eslint-disable react/prop-types */

const BackdropComp = ({setIsOpenModal}) => {
  return (
    <div onClick={()=>setIsOpenModal(false)} className="w-full h-full bg-[#313131] z-40 fixed top-0 opacity-70">
    </div>
  )
}

export default BackdropComp