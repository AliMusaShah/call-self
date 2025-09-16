import { IoNotificationsOutline } from "react-icons/io5";

function Notification() {
    return (
        <div className='relative w-[50px] h-[50px] border border-white rounded-full flex justify-center items-center cursor-pointer'>
            <IoNotificationsOutline color="#667085" size={28} />
            <div className="absolute bg-[#1EB386]  px-2 py-1  top-0 right-0 rounded-full flex">
                <span className="text-white text-xs"> 2</span>
            </div>
        </div>
    )
}

export default Notification