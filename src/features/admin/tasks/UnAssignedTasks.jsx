import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllUnAssignedTaskQuery } from '../../../api/apiSlice';
import CustomLoader from '../../../components/CustomLoader';
import Pagination from '../../../components/Pagination';
import ReusableTable from '../../../components/ReusableTable';
import { dateFormat, useDebounce } from '../../../utils/Helper';

const UnAssignedTasks = ({ query }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedQuery = useDebounce(query, 500);
    const { data: allUnAssignedTask, isLoading, } = useGetAllUnAssignedTaskQuery({ page: currentPage, limit: 10, customer_first_name: debouncedQuery })
    const navigate = useNavigate()
    const columns = [
        { header: 'Sr#', accessor: 'name' },
        {
            header: 'Tasks', accessor: 'job_category',

            render: ({ job_category }) => {
                const { category_name } = job_category
                return (
                    <div>{category_name} </div>
                )
            }
        },
        {
            header: 'Customers', accessor: 'customer', render: ({ customer }) => {
                return (
                    <div>{customer?.customer_first_name} {customer?.customer_last_name}</div>
                )
            }
        },
        {
            header: 'Inspection Type', accessor: 'Inspection Type', render: ({ job_title }) => {
                return (
                    <div>{job_title} </div>
                )
            }
        },

        {
            header: 'Created Date', accessor: 'created_at', render: ({ created_at }) => (
                <div>{dateFormat(created_at)}</div>
            )
        },


    ];
    const handleAssign = (row) => {
        // console.log(row, 'row')
        navigate('/tasks/AssignTask', { state: { jobId: row?.job_uid } })

    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        if (debouncedQuery !== query) {
            setCurrentPage(1);
        }
    }, [debouncedQuery, query]);
    // console.log(allUnAssignedTask?.pagination, 'allUnAssignedTask')
    return (
        <>
            {isLoading ? <CustomLoader /> :
                <>
                    <ReusableTable columns={columns} data={allUnAssignedTask?.data} onClick={handleAssign} rowStyle='hover:bg-gray-200 shadow cursor-pointer' />
                    <Pagination
                        totalCount={allUnAssignedTask?.pagination?.total}
                        totalPages={allUnAssignedTask?.pagination?.totalPages}
                        currentPage={allUnAssignedTask?.pagination?.page}
                        onPageChange={handlePageChange}
                    />
                </>
            }
        </>
    )
}

export default UnAssignedTasks