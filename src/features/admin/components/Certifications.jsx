import React from 'react'
import { CgMoreVertical } from 'react-icons/cg'
import { FiRefreshCw } from 'react-icons/fi'
import CustomLoader from '../../../components/CustomLoader'

const Certifications = ({ data, refetch, isLoading }) => {
    // const certifications = [
    //     {
    //         id: 1,
    //         name: 'Aiden Murray',
    //         expires: '2025-02-28',
    //         status: 'Active',
    //         avatar: null,
    //         initials: null
    //     },
    //     {
    //         id: 2,
    //         name: 'Manuel Morrison',
    //         expires: '2025-02-12',
    //         status: 'Expired',
    //         avatar: null,
    //         initials: null
    //     },
    //     {
    //         id: 3,
    //         name: 'Jared Hawkins',
    //         expires: '2025-02-28',
    //         status: 'Active',
    //         avatar: null,
    //         initials: 'JH',
    //         bgColor: 'bg-emerald-500'
    //     },
    //     {
    //         id: 4,
    //         name: 'Jennie Fowler',
    //         expires: '2025-02-28',
    //         status: 'Active',
    //         avatar: null,
    //         initials: null
    //     },
    //     {
    //         id: 5,
    //         name: 'Rena Sanders',
    //         expires: '2025-02-28',
    //         status: 'Active',
    //         avatar: null,
    //         initials: 'JH',
    //         bgColor: 'bg-blue-400'
    //     }
    // ]
    // console.log(data, 'certifications data')
    return (
        <div className=" bg-[#FAFAFA] rounded-xl shadow-md overflow-hidden flex-1">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="text-blue-500 mr-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-medium text-gray-800">Certifications</h2>
                    </div>
                    <div className="flex items-center">
                        <button className="text-gray-500 hover:text-gray-700 mr-2" onClick={refetch}>
                            <FiRefreshCw size={20} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                            <CgMoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {isLoading ? <CustomLoader /> : (
                    <ul className="space-y-4">
                        {data?.map((cert) => {
                            return (
                                <li key={cert.id} className="flex items-center">
                                    {cert.initials ? (
                                        <div className={`${cert.bgColor} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                                            {cert.initials}
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    )}
                                    <div className="ml-3 flex-1">
                                        <p className="text-sm font-medium text-gray-800">
                                            {cert.customer?.data?.customer_first_name} {cert.customer?.data?.customer_last_name}
                                        </p>
                                        <p className="text-xs text-gray-500">Expires: {cert?.expiredDate}</p>
                                    </div>
                                    <span className={`text-sm ${cert.ratingType === 'Active' ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {cert.ratingType}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Certifications