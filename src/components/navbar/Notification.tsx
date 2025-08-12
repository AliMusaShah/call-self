import { IoIosNotifications } from "react-icons/io";

function Notification() {
    return (
        <div className='relative w-[50px] h-[50px] border border-[#00000033] rounded-full flex justify-center items-center cursor-pointer'>
            <IoIosNotifications color="#7A3FFD" size={28} fill="#7A3FFD" />
            <div className="absolute bg-[#FF5A1F] p-1 top-2 right-3 rounded-full flex"></div>
        </div>
    )
}

export default Notification