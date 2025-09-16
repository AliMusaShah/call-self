import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useDeleteMarketPlaceMutation, useGetAllMarketPlaceQuery } from '../../../api/apiSlice';
import CustomButton from '../../../components/CustomButton';
import CustomLoader from '../../../components/CustomLoader';
import FilterDropdown from '../../../components/FilterDropdown';
import Pagination from '../../../components/Pagination';
import ReusableTable from '../../../components/ReusableTable';
import { Months } from '../../../mock/data';
import Header from '../../../ui/Header';
import { dateFormat, useDebounce } from '../../../utils/Helper';
import NoDataFound from '../../../components/NoDataFound';

const MarketPlace = () => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // const [isModal, setIsModal] = useState(null);
    const [timeFrame, setTimeFrame] = useState('Monthly');
    const navigate = useNavigate()
    const [deleteMarketPlace] = useDeleteMarketPlaceMutation();
    const debouncedQuery = useDebounce(query, 500);
    const { data: marketPlace, isLoading } = useGetAllMarketPlaceQuery({ page: currentPage, limit: 10, serviceName: debouncedQuery, filterBy: timeFrame })
    const handleEdit = (row) => {
        navigate('/market-place/addservice', { state: { serviceId: row?._id } })
    };


    const handleDelete = async (row) => {
        try {
            // console.log(row, 'row to delete');
            await deleteMarketPlace(row?._id).unwrap()

        } catch (error) {
            console.log(error)
        }
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        if (debouncedQuery !== query) {
            setCurrentPage(1);
        }
    }, [debouncedQuery, query]);
    const columns = [
        { header: 'Sr#', accessor: 'name' },
        { header: 'Service', accessor: 'serviceName' },
        { header: 'Category', accessor: 'category' },
        { header: 'Price', accessor: 'basePrice' },
        { header: 'Status', accessor: 'status' },
        {
            header: 'Created Date', accessor: 'createdAt', render: ({ createdAt }) => (
                <div>{dateFormat(createdAt)}</div>
            )
        },
        {
            header: 'Action',
            render: (row) => (
                <div className='flex gap-2'>
                    <button
                        type='button'
                        className='w-[35px] h-[35px] rounded-[99px]  bg-[#0095FF1A] text-primary text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                        onClick={() => handleEdit(row)}
                    >
                        <CiEdit />
                    </button>
                    <button
                        type='button'
                        className=' rounded-[99px] bg-[#FFF2F2] text-red-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                        onClick={() => handleDelete(row)}
                    >
                        <AiOutlineDelete size={22} />
                    </button>


                </div>
            ),

        },
    ];
    // console.log(marketPlace?.data, 'marketPlace')
    return (
        <>
            {isLoading ? <CustomLoader /> : (
                <>
                    <Header value={query} onChange={(e) => setQuery(e.target.value)}>
                        <FilterDropdown value={timeFrame} options={Months} onChange={(e) => setTimeFrame(e.target.value)} />
                        <CustomButton size='md' to='/market-place/addservice' >
                            Add Service +
                        </CustomButton>
                    </Header>
                    {marketPlace?.data?.MarketPlaces && marketPlace?.data?.MarketPlaces.length > 0 ?
                        <>
                            <ReusableTable columns={columns} data={marketPlace?.data?.MarketPlaces} />
                            <Pagination
                                totalCount={marketPlace?.data?.count}
                                totalPages={marketPlace?.data?.pages}
                                currentPage={marketPlace?.data?.page}
                                onPageChange={handlePageChange}
                            />
                        </>
                        :
                        <NoDataFound />
                    }
                </>
            )

            }
        </>
    )
}

export default MarketPlace