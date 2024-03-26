import { useSearchParams } from 'react-router-dom'
const ProductWeb = () => {
    const [searchParam] = useSearchParams()
    return (
        <div className='font-bold font-Cursive text-2xl flex justify-center p-10 text-red-500'>{searchParam.get("name")} website</div>
    )
}
export default ProductWeb