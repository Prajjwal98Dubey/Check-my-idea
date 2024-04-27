const Pagination = (prop) => {
  return (
    <div>
        <button className='w-[150px] h-[35px] bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold rounded-lg'onClick={()=>prop.setSkip(prop.skip+3)}>Load More...</button>
    </div>
  )
}

export default Pagination
