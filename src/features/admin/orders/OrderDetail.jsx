import React from 'react'
import CustomButton from '../../../components/CustomButton'
import { useGetOrderByIdQuery } from '../../../api/apiSlice'
import CustomLoader from '../../../components/CustomLoader'

const OrderDetail = ({ currentOrder }) => {
    const { data: orderDetail, isLoading } = useGetOrderByIdQuery(currentOrder)
    return (
        <>
            {isLoading ? <CustomLoader /> : (
                <div className=" p-2 bg-white rounded-2xl ">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Randy Curtis</h2>
                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">Product/Inspection:</span>
                            <span>{orderDetail?.data?.order?.serviceId?.description}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">Address:</span>
                            <span>Lorem ipsum</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">Price:</span>
                            <span>{orderDetail?.data?.order?.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-500">Status:</span>
                            <span className="flex items-center">
                                <span className="text-[#F18100] mr-1">{orderDetail?.data?.order?.status}</span>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">Ordered Date:</span>
                            <span className="text-green-600 font-semibold">{orderDetail?.data?.order?.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-500">Completed Date:</span>
                            <span>{orderDetail?.data?.order?.completedDate}</span>
                        </div>
                    </div>
                    {/* <div className="flex justify-end my-5">
                <CustomButton
                    type="button"
                    className="mr-4 px-6 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                >
                    Cancel
                </CustomButton>
                <CustomButton
                    type="submit"
                    className="px-6 py-2 text-white bg-defaultGreen rounded-md"
                >
                    Completed
                </CustomButton>
            </div> */}

                </div>
            )}
        </>
    )
}

export default OrderDetail