import React from 'react'
import { RxArrowBottomLeft } from "react-icons/rx";
import { HiArrowUpRight } from "react-icons/hi2";

const Cards = ({ item }) => {
    const cardData = [
        {
            title: "Total Assigned Jobs",
            subtitle: "In Progress",
            value: item?.totalAssignedJobs || 0,
            icon: <RxArrowBottomLeft className="text-red-500" size={20} />,
        },
        {
            title: "Completed Jobs",
            subtitle: "Clients",
            value: item?.completedJobs || 0,
            icon: <HiArrowUpRight className="text-green-500" size={20} />,
        },
        {
            title: "Queue Jobs",
            subtitle: "Jobs Completed",
            value: item?.queueJobs || 0,
            icon: <RxArrowBottomLeft className="text-red-500" size={20} />,
        },
        {
            title: "Repeated Customers",
            subtitle: "Jobs Completed",
            value: item?.repeatedCustomerCount || 0,
            icon: <RxArrowBottomLeft className="text-red-500" size={20} />,
        },
    ];

    return (
        <>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                {cardData.map((item, index) => (
                    <div key={index} className="bg-[#FAFAFB] p-3 shadow-md rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-6xl font-semibold ">
                                    {item.value || 0}
                                </h1>
                                <h1 className="font-semibold text-2xl">
                                    { }{item.title}
                                </h1>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="flex items-center text-gray-500 font-semibold"><span>{item.icon}</span> <span className='mx-1'> 12 </span> +10.2% this week</h3>
                        </div>
                    </div>))}
            </div>
        </>
    )
}

export default Cards