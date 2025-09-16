import { HiArrowUpRight } from 'react-icons/hi2';
import { RxArrowBottomLeft } from 'react-icons/rx';

const OwnerCards = ({ data }) => {

    const cardData = [
        {
            title: "Temperature",
            subtitle: "°C",
            value: data?.temperature || "0",
            icon: <RxArrowBottomLeft className="text-red-500" size={20} />,
            color: "bg-[#00C7BE]"
        },
        {
            title: "Humidity",
            subtitle: "%",
            value: data?.humidity || "0",
            icon: <HiArrowUpRight className="text-green-500" size={20} />,
            color: "bg-[#00C7BE]"
        },
        {
            title: "Small particles",
            subtitle: "ppm",
            value: data?.smallParticles || "0",
            icon: <RxArrowBottomLeft className="text-red-500" size={20} />,
            color: "bg-[#FF9500]"
        },
        {
            title: "Large particles",
            subtitle: "ppm",
            value: data?.largeParticles || "0",
            icon: <RxArrowBottomLeft className="text-red-500" size={20} />,
            color: "bg-[#00C7BE]"
        },
    ];
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                {cardData.map((item, index) => (
                    <div key={index} className="bg-[#FAFAFB] p-3 shadow-md rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center justify-between gap-2'>

                                <div>
                                    <h1 className="font-semibold text-2xl">
                                        {item.title}
                                    </h1>
                                    <h1 className="text-5xl font-semibold ">
                                        {item.value}
                                        <span className='font-normal text-3xl text-gray-400 mx-2'>{item.subtitle}</span>
                                    </h1>
                                </div>
                            </div>
                            <div className={`w-5 h-2 rounded-md mr-2 ${item.color}`}></div>
                        </div>

                    </div>))}
            </div>
        </>
    )
}

export default OwnerCards