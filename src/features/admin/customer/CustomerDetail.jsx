import React from 'react';
import { useGetCustomerByIdQuery } from '../../../api/apiSlice';
import CustomLoader from '../../../components/CustomLoader';

const CustomerDetail = ({ id }) => {
    const { data: customerDetail, isLoading } = useGetCustomerByIdQuery(id)
    // console.log(customerDetail?.customer?.data, 'customerDetail')


    return (
        <>

            {isLoading ? <CustomLoader /> : (<div className="  bg-white rounded-lg  overflow-hidden z-10">
                <div className=" space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800">{customerDetail?.customer?.data?.customer_first_name} {customerDetail?.customer?.data?.customer_last_name}</h1>

                    <div className="space-y-0">
                        <div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0"  >
                            <span className="text-gray-500">Email:</span>
                            <span className='text-gray-800'>
                                {customerDetail?.customer?.data?.customer_email}
                            </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0"  >
                            <span className="text-gray-500">Phone:</span>
                            <span className='text-gray-800'>

                                {customerDetail?.customer?.data?.customer_contact_no?.mobile}
                            </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0"  >
                            <span className="text-gray-500">Address:</span>
                            <span className='text-gray-800'>
                                {customerDetail?.customer?.data?.customer_address?.street || '-'} {customerDetail?.customer?.data?.customer_address?.city} {customerDetail?.customer?.data?.customer_address?.country}
                            </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0"  >
                            <span className="text-gray-500">City:</span>
                            <span className='text-gray-800'>
                                {customerDetail?.customer?.data?.customer_address?.city || '---'}
                            </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0"  >
                            <span className="text-gray-500">State:</span>
                            <span className='text-gray-800'>

                                {customerDetail?.customer?.data?.customer_address?.state || '---'}
                            </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0"  >
                            <span className="text-gray-500">Status:</span>
                            <span className='text-gray-800'>
                                {customerDetail?.customer?.data?.customer_status || '---'}
                            </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0"  >
                            <span className="text-gray-500">Created Date:</span>
                            <span className='text-gray-800'>
                                {customerDetail?.customer?.data?.created_at}
                            </span>
                        </div>
                    </div>
                </div>
            </div>)}
        </>

    );
};

export default CustomerDetail;