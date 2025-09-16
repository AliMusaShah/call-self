import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDeleteCertificateMutation, useGetAllCertificatesQuery } from "../../../api/apiSlice";
import CustomButton from "../../../components/CustomButton";
import CustomLoader from "../../../components/CustomLoader";
import CustomModal from "../../../components/CustomModal";
import FilterDropdown from "../../../components/FilterDropdown";
import Pagination from "../../../components/Pagination";
import ReusableTable from "../../../components/ReusableTable";
import { Months } from "../../../mock/data";
import Header from "../../../ui/Header";
import CertificateDetail from "./CertificateDetail";
import { FaRegEye } from "react-icons/fa";
import { dateFormat, useDebounce } from "../../../utils/Helper";
import NoDataFound from "../../../components/NoDataFound";

const Certificates = () => {
    const [query, setQuery] = useState('');
    const [isModal, setIsModal] = useState(null);
    const [timeFrame, setTimeFrame] = useState('Monthly');
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedQuery = useDebounce(query, 500);
    const { data: allCertificates, isLoading } = useGetAllCertificatesQuery({ page: currentPage, limit: 10, ratingType: debouncedQuery, filterBy: timeFrame })
    const [deleteCertificate] = useDeleteCertificateMutation()
    const [currentCertificateId, setCurrentCertificateId] = useState(null)
    const navigate = useNavigate()
    const handleModal = (row) => {
        setIsModal(true);
        setCurrentCertificateId(row?._id)
    };
    const handleDelete = async (row) => {
        try {
            await deleteCertificate(row?._id).unwrap()
        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = (row) => {
        // console.log(row, 'row')
        navigate(`/certificates/editcertificate/${row?._id}`)

    }
    const handleClose = () => {
        setIsModal(null)
        setCurrentCertificateId(null)
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const columns = [
        { header: 'Sr#', accessor: 'name' },
        {
            header: 'Customers',
            render: ({ customer_uid }) => {
                if (!customer_uid) {
                    return <div>N/A</div>;
                }

                const { fullName } = customer_uid;
                return <div>{fullName?.trim() || 'N/A'}</div>;
            }
        },
        { header: 'Certificate Type', accessor: 'certificateType' },
        { header: 'Current Rating', accessor: 'currentRating' },
        {
            header: 'Status', accessor: 'ratingType', render: ({ ratingType }) => {
                return (
                    <div>{ratingType || '---'}</div>
                )
            }
        },
        {
            header: 'Created Date', accessor: 'createdAt', render: ({ createdAt }) => (
                <div>{dateFormat(createdAt)}</div>
            )
        },
        {
            header: 'Expired Date', accessor: 'expiredDate', render: ({ expiredDate }) => (
                <div>{dateFormat(expiredDate)}</div>
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
                        className=' rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                        onClick={() => handleModal(row)}
                    >
                        <FaRegEye size={22} />
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

    useEffect(() => {
        if (debouncedQuery !== query) {
            setCurrentPage(1);
        }
    }, [debouncedQuery, query]);
    console.log(allCertificates?.data, 'allCertificates')
    return (
        <>
            {isLoading ? <CustomLoader /> : (
                <>
                    <Header value={query} onChange={(e) => setQuery(e.target.value)} placeholder='search by status'>
                        <FilterDropdown value={timeFrame} options={Months} onChange={(e) => setTimeFrame(e.target.value)} />
                        <CustomButton size='md' to='/certificates/addcertificate' >
                            New Certificate +
                        </CustomButton>
                    </Header>

                    {allCertificates?.data?.certificates && allCertificates?.data?.certificates.length > 0 ?
                        <>
                            <ReusableTable columns={columns} data={allCertificates?.data?.certificates} />
                            <Pagination
                                totalCount={allCertificates?.data?.count}
                                totalPages={allCertificates?.data?.pages}
                                currentPage={allCertificates?.data?.page}
                                onPageChange={handlePageChange}
                            />
                        </>
                        :
                        <NoDataFound />
                    }
                    <CustomModal isOpen={isModal} title='Certificate Details' onClose={handleClose}>

                        <CertificateDetail id={currentCertificateId} />
                    </CustomModal>
                </>
            )}
        </>
    )
}

export default Certificates