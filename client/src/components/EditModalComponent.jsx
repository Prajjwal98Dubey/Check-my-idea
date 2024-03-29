import { CLOSE_ICONS } from "../helpers/icons"


const EditModalComponent = () => {
  return (
    <div className="w-[550px] h-[320px] z-10 bg-white rounded-lg">
        <div className="flex justify-end">
            <img src={CLOSE_ICONS} alt="loading" className="w-[25px] h-[15px]" />
        </div>
        
    </div>
  )
}

export default EditModalComponent