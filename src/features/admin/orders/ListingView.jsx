import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';
import { useGetAllOrdersQuery, useUpdateOrderMutation } from '../../../api/apiSlice';
import CustomModal from '../../../components/CustomModal';
import Pagination from '../../../components/Pagination';
import ReusableTable from '../../../components/ReusableTable';
import OrderDetail from './OrderDetail';
import CustomLoader from '../../../components/CustomLoader';
import { toast } from 'react-toastify';
import { statusOptions } from '../../../mock/data';
import { dateFormat, useDebounce } from '../../../utils/Helper';
import NoDataFound from '../../../components/NoDataFound';

const ListingView = ({ status, filterBy }) => {
    const [isModal, setIsModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedQuery = useDebounce(status, 500);
    const { data: orders, isLoading } = useGetAllOrdersQuery({ page: currentPage, limit: 10, filterBy: filterBy, status: debouncedQuery })

    const [updateOrder] = useUpdateOrderMutation()

    const handleModal = (row) => {
        // console.log(row?._id, 'row')
        setCurrentOrder(row?._id)
        setIsModal(true);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const updateOrderStatus = async (row, e) => {
        // console.log(row, 'orderRow')
        // console.log(e.target.value, 'e.target.value')

        try {
            const payload = {
                status: e.target.value
            }
            // console.log(payload, 'payload')
            await updateOrder({ id: row?._id, payload: payload }).unwrap()
            toast.success('Status Updated successfully')
        } catch (error) {
            // console.log(error)
            toast.error(error?.data?.message || 'An error occurred while updating the status. Please try again.');

        }
    }
    // console.log(orders?.data, 'orders')
    const columns = [
        { header: 'Sr#', accessor: 'name' },
        { header: 'Customers', accessor: 'customerName' },
        {
            header: 'Product/Service', accessor: 'serviceId', render: ({ serviceId }) => {
                // console.log(serviceId, 'serviceId')
                const description = serviceId?.description
                return (
                    <div>
                        {description}
                    </div>
                )
            }
        },
        { header: 'Price', accessor: 'price' },
        {
            header: 'Status', accessor: 'status', render: (row) => {
                // console.log(row, 'row')


                return (
                    <div className="flex  items-center">
                        <label className="inline-flex items-center cursor-pointer">
                            <select
                                className=" border text-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => updateOrderStatus(row, e)}
                            >
                                <option value="">{row?.status || 'Select Status'}</option>


                                {statusOptions.filter(item => item !== row?.status).map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )
            }
        },
        {
            header: 'Ordered Date', accessor: 'createdAt', render: ({ createdAt }) => (
                <div>{dateFormat(createdAt)}</div>
            )
        },
        {
            header: 'Completed Date', accessor: 'completedDate', render: ({ completedDate }) => (
                <div>{dateFormat(completedDate)}</div>
            )
        },

        {
            header: 'Action',
            render: (row) => (
                <div className='flex gap-2'>
                    <button
                        type='button'
                        className=' rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                        onClick={() => handleModal(row)}
                    >
                        <IoEyeOutline size={22} />
                    </button>

                    <button
                        type='button'
                        className=' rounded-[99px] bg-[#FFF2F2] text-red-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                    >
                        <AiOutlineDelete size={22} />
                    </button>


                </div>
            ),

        },
    ];

    useEffect(() => {
        if (debouncedQuery !== status) {
            setCurrentPage(1);
        }
    }, [debouncedQuery, status]);
    return (
        <>
            {isLoading ? <CustomLoader /> : (
                <>

                    {orders?.data?.orders && orders?.data?.orders.length > 0 ?
                        <>
                            <ReusableTable columns={columns} data={orders?.data?.orders} />
                            <Pagination

                                totalCount={orders?.data?.count}
                                totalPages={orders?.data?.pages}
                                currentPage={orders?.data?.page}
                                onPageChange={handlePageChange}
                            />
                        </>
                        :
                        <NoDataFound />
                    }
                    <CustomModal isOpen={isModal} title='Order Details' onClose={() => setIsModal(false)}>

                        <OrderDetail currentOrder={currentOrder} />
                    </CustomModal>
                </>
            )}
        </>
    )
}

export default ListingView