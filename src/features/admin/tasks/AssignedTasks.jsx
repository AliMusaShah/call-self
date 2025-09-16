import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGetAllAssignedTaskQuery } from '../../../api/apiSlice';
import CustomLoader from '../../../components/CustomLoader';
import Pagination from '../../../components/Pagination';
import ReusableTable from '../../../components/ReusableTable';
import { useEffect, useState } from 'react';
import { dateFormat, useDebounce } from '../../../utils/Helper';
import NoDataFound from '../../../components/NoDataFound';

const AssignedTasks = ({ query, timeFrame }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedQuery = useDebounce(query, 500);
    const { data: allAssignedTask, isLoading } = useGetAllAssignedTaskQuery({ page: currentPage, limit: 10, priority: debouncedQuery, filterBy: timeFrame })
    const navigate = useNavigate()
    const handleModal = (row) => {
        // console.log(row, 'row')
        navigate(`/tasks/taskDetail/${row._id}`)
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const columns = [
        { header: 'Sr#', accessor: 'name' },
        {
            header: 'Customers', accessor: 'jobData', render: ({ jobData }) => {
                const { customer } = jobData
                return (
                    <div>{customer?.customer_first_name} {customer?.customer_last_name}</div>
                )
            }
        },
        {
            header: 'Inspection Type', accessor: 'Inspection Type', render: ({ jobData }) => {
                return (
                    <div>{jobData?.job_title} </div>
                )
            }
        },
        { header: 'Priority', accessor: 'priority' },
        { header: 'Status', accessor: 'status' },
        { header: 'Assigned By', accessor: 'Assigned By' },
        {
            header: 'Assigned Date', accessor: 'createdAt', render: ({ createdAt }) => {
                return (
                    <div>{createdAt ? dateFormat(createdAt) : '----'}</div>
                )
            }
        },
        {
            header: 'Completed Date', accessor: 'completedAt', render: ({ completedAt }) => {
                return (
                    <div>{completedAt ? dateFormat(completedAt) : '----'}</div>
                )
            }
        },
        {
            header: 'Modified Date', accessor: 'updatedAt', render: ({ updatedAt }) => {
                return (
                    <div>{updatedAt ? dateFormat(updatedAt) : '----'}</div>
                )
            }
        },

        // {
        //     header: 'Action',
        //     render: () => (
        //         <div className='flex gap-2'>
        //             <CustomButton
        //                 type='button'
        //                 size='md'
        //                 disabled={false}
        //             >
        //                 <span>View</span>
        //             </CustomButton>
        //         </div>
        //     ),

        // },
        {
            header: 'View',
            render: (row) => (
                <button
                    type='button'
                    className=' rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                    onClick={() => handleModal(row)}
                >
                    <FaRegEye size={22} />
                </button>
            ),

        },
    ];
    useEffect(() => {
        if (debouncedQuery !== query) {
            setCurrentPage(1);
        }
    }, [debouncedQuery, query]);
    return (
        <>
            {isLoading ? <CustomLoader /> :
                <>


                    {allAssignedTask?.data?.tasks && allAssignedTask?.data?.tasks.length > 0 ?
                        <>
                            <ReusableTable columns={columns} data={allAssignedTask?.data?.tasks} />
                            <Pagination
                                totalCount={allAssignedTask?.data?.totalCount}
                                totalPages={allAssignedTask?.data?.totalPages}
                                currentPage={allAssignedTask?.data?.page}
                                onPageChange={handlePageChange} />
                        </>
                        :
                        <NoDataFound />
                    }
                </>
            }

        </>
    )
}

export default AssignedTasks