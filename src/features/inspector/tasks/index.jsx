import { useEffect, useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useGetAllAssignedTaskQuery } from '../../../api/apiSlice';
import CustomLoader from '../../../components/CustomLoader';
import FilterDropdown from '../../../components/FilterDropdown';
import Pagination from '../../../components/Pagination';
import ReusableTable from '../../../components/ReusableTable';
import Header from '../../../ui/Header';
import { Months } from '../../../mock/data';
import { CiEdit } from 'react-icons/ci';
import { dateFormat, useDebounce } from '../../../utils/Helper';




const InspectorTasks = () => {
    const [query, setQuery] = useState('');
    const [timeFrame, setTimeFrame] = useState('Monthly');
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate()
    const debouncedQuery = useDebounce(query, 500);
    const { data: taskData, isLoading } = useGetAllAssignedTaskQuery({ page: currentPage, limit: 10, priority: debouncedQuery, filterBy: timeFrame })
    const handleModal = (row) => {
        // console.log(row, 'row')
        if (row?.type === 'Pre-Inspection') {
            navigate(`/inspector-tasks/add/${row?._id}`)
        }
        else if (row?.type === 'Post-Inspection') {
            navigate(`/inspector-tasks/post/${row?._id}`)
        }
    };

    const handleTaskDetail = (row) => {
        navigate(`/inspector-tasks/taskDetail/${row?._id}`)
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const columns = [
        { header: 'Sr#', accessor: 'name' },
        {
            header: 'Tasks', accessor: 'inspectorId', render: ({ inspectorId }) => {
                return (
                    <div>{inspectorId?.fullName}</div>
                )
            }
        },
        {
            header: 'Customers', accessor: 'jobData', render: ({ jobData }) => {
                const { customer } = jobData
                return (
                    <div>{customer?.customer_first_name} {customer?.customer_last_name}</div>
                )
            }
        },
        {
            header: 'Inspection Type', accessor: 'jobData', render: ({ jobData }) => {
                return (
                    <div>{jobData?.job_title} </div>
                )
            }
        },
        { header: 'Status', accessor: 'status' },
        {
            header: 'Completed Date', accessor: 'completedDate',
            render: ({ completedDate }) => {
                return (
                    <div>{completedDate ? dateFormat(completedDate) : '-----'} </div>
                )
            }
        },
        {
            header: 'Assigned Date', accessor: 'createdAt', render: ({ createdAt }) => (
                <div>{dateFormat(createdAt)}</div>
            )
        },
        {
            header: 'Action',
            render: (row) => (
                <div className='flex gap-2'>


                    <button
                        type='button'
                        className=' rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                        onClick={() => handleTaskDetail(row)}
                    >
                        <IoEyeOutline size={22} />
                    </button>

                    <button
                        type='button'
                        className=' rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                        onClick={() => handleModal(row)}
                    >
                        <CiEdit size={22} />
                    </button>



                </div>
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
            {isLoading ? <CustomLoader /> : (
                <>
                    <Header value={query} onChange={(e) => setQuery(e.target.value)}>
                        <FilterDropdown value={timeFrame} options={Months} onChange={(e) => setTimeFrame(e.target.value)} />
                    </Header>
                    <ReusableTable columns={columns} data={taskData?.data?.tasks} />
                    <Pagination
                        totalCount={taskData?.data?.totalCount}
                        totalPages={taskData?.data?.totalPages}
                        currentPage={taskData?.data?.page}
                        onPageChange={handlePageChange}

                    />
                </>
            )}

        </>
    )
}

export default InspectorTasks