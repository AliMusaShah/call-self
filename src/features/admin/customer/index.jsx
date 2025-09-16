import { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { useGetAllCustomerQuery } from '../../../api/apiSlice';
import CustomLoader from '../../../components/CustomLoader';
import CustomModal from '../../../components/CustomModal';
import FilterDropdown from '../../../components/FilterDropdown';
import Pagination from '../../../components/Pagination';
import ReusableTable from '../../../components/ReusableTable';
import { Months } from '../../../mock/data';
import Header from '../../../ui/Header';
import CustomerDetail from './CustomerDetail';
import { dateFormat, useDebounce } from '../../../utils/Helper';

const Customer = () => {
    const [query, setQuery] = useState('');
    const [isModal, setIsModal] = useState(null);
    const [currentCustomerId, setCurrentCustomerId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    // const [timeFrame, setTimeFrame] = useState(null)
    const debouncedQuery = useDebounce(query, 500);

    // Reset to first page when search query changes

    const { data: allCustomers, isLoading: customerLoader, } = useGetAllCustomerQuery({ page: currentPage, limit: 10, customer_first_name: debouncedQuery });
    const handleModal = (row) => {
        setIsModal(true);
        setCurrentCustomerId(row?.customer_uid)
    };
    const handleClose = () => {
        setIsModal(null)
        setCurrentCustomerId(null)
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const isLoading = customerLoader;

    const columns = [
        { header: 'Sr#', accessor: 'name' },
        {
            header: 'Customers', accessor: '', render: ({ customer_first_name, customer_last_name }) => {
                return (
                    <div>{customer_first_name} {customer_last_name}</div>
                )
            }
        },
        {
            header: 'Phone', accessor: 'customer_contact_no', render: ({ customer_contact_no }) => {
                const { mobile } = customer_contact_no || {}
                return (
                    <div>{mobile || 'N/A'}</div>
                )
            }
        },
        {
            header: 'City', accessor: 'customer_address', render: ({ customer_address }) => {
                return (
                    <div>{customer_address?.city || '---'}</div>
                )
            }
        },
        {
            header: 'State', accessor: 'customer_address',

            render: ({ customer_address }) => {
                return (
                    <div>{customer_address?.state || '---'}</div>
                )
            }

        },
        {
            header: 'Created Date', accessor: 'created_at', render: ({ created_at }) => (
                <div>{dateFormat(created_at)}</div>
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
                        <FaRegEye size={22} />
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

    // console.log(allCustomers?.data?.pagination, 'allCustomers')
    return (
        <>
            {isLoading ? <CustomLoader /> : (
                <>
                    <Header value={query} onChange={(e) => setQuery(e.target.value)}>
                        {/* <FilterDropdown value={timeFrame} options={Months} onChange={(e) => setTimeFrame(e.target.value)} /> */}
                        {/* <CustomButton size='md' to='/customers/AddCustomer' >
                                Add Customer +
                      </CustomButton> */}
                    </Header>
                    <ReusableTable columns={columns} data={allCustomers?.data?.data} />
                    <Pagination
                        totalCount={allCustomers?.data?.pagination.total_records}
                        totalPages={allCustomers?.data?.pagination.total_pages}
                        currentPage={allCustomers?.data?.pagination.current_page}
                        onPageChange={handlePageChange}

                    />
                    <CustomModal isOpen={isModal} title='Customer Details' onClose={handleClose}>

                        <CustomerDetail id={currentCustomerId} />
                    </CustomModal>
                </>
            )}
        </>
    )
}

export default Customer