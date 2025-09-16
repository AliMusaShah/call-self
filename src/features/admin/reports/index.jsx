import { useEffect, useState } from 'react';
import { useGetInspectionReportsQuery } from '../../../api/apiSlice';
import CustomButton from '../../../components/CustomButton';
import CustomLoader from '../../../components/CustomLoader';
import Pagination from '../../../components/Pagination';
import ReusableTable from '../../../components/ReusableTable';
import Header from '../../../ui/Header';
import DateSortComponent from './DateSortComponent';
import { dateFormat, useDebounce } from '../../../utils/Helper';
import NoDataFound from '../../../components/NoDataFound';

const Reports = () => {
    const [query, setQuery] = useState('');
    const [timestamps, setTimestamps] = useState({
        completedDate: '',
        createdAt: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedQuery = useDebounce(query, 500);
    const queryParams = {
        page: currentPage,
        limit: 10,
        status: debouncedQuery,
        ...timestamps  // Spreads completedDate and createdAt
    };

    const { data: inspectionReports, isLoading } = useGetInspectionReportsQuery(queryParams)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const columns = [
        { header: 'Sr#', accessor: 'name' },
        {
            header: 'Customers', accessor: 'title', render: ({ jobData }) => {
                const { customer } = jobData
                return (
                    <div>
                        {customer?.customer_first_name}

                        {customer?.customer_last_name}

                    </div>
                )
            }
        },
        {
            header: 'Inspection Type', accessor: 'type',
            //  render: ({ jobData }) => {
            //     const { job_title } = jobData
            //     return (
            //         <div>
            //             {job_title}


            //         </div>
            //     )
            // }
        },
        {
            header: 'Type of Facility', accessor: 'premisesDetails', render: ({ premisesDetails }) => {
                return (
                    <div>
                        {premisesDetails?.apartment && <p>Apartment</p>}
                        {premisesDetails?.villa && <p>villa</p>}
                        {/* {premisesDetails?.apartment && <p>Apartment</p> } */}
                    </div>
                )
            }
        },
        { header: 'No. of Rooms', accessor: 'numberOfRooms' },

        {
            header: 'Status', accessor: 'status',
            render: ({ task }) => {
                const { status } = task
                return (
                    <div>
                        {status}
                    </div>
                )
            }
        },
        {
            header: 'Completed Date', accessor: 'task', render: ({ task }) => {
                const { completedDate } = task
                return (
                    <div>
                        {dateFormat(completedDate)}
                    </div>
                )
            }
        },
        {
            header: 'Assigned Date', accessor: 'task', render: ({ task }) => {
                const { createdAt } = task
                return (
                    <div>
                        {dateFormat(createdAt) || <p>'--'</p>}
                    </div>
                )
            }
        },


    ];
    useEffect(() => {
        if (debouncedQuery !== query) {
            setCurrentPage(1);
        }
    }, [debouncedQuery, query]);

    // console.log(inspectionReports?.data
    //     , 'inspectionReports')
    return (
        <>

            {isLoading ? <CustomLoader /> : (
                <>
                    <Header value={query} onChange={(e) => setQuery(e.target.value)}>
                        <DateSortComponent setTimestamps={setTimestamps} />
                        <div className='flex gap-4 items-center justify-center'>

                            <CustomButton size='md' >
                                Export PDF
                            </CustomButton>
                        </div>
                    </Header>
                    {inspectionReports?.data?.reports && inspectionReports?.data?.reports.length > 0 ?
                        <>
                            <ReusableTable columns={columns} data={inspectionReports?.data?.reports} />
                            <Pagination
                                totalCount={inspectionReports?.data?.count}
                                totalPages={inspectionReports?.data?.pages}
                                currentPage={inspectionReports?.data?.page}
                                onPageChange={handlePageChange}
                            />
                        </>
                        :
                        <NoDataFound />
                    }

                </>
            )}
        </>
    )
}

export default Reports