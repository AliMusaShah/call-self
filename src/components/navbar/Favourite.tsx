import { FaHeart } from 'react-icons/fa'

const Favourite = () => {
    return (
        <div className='relative w-[50px] h-[50px] border border-[#00000033] rounded-full flex justify-center items-center cursor-pointer'>
            <FaHeart color="#C5292A" size={22} />
        </div>
    )
}

export default Favourite