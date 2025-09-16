import { useEffect, useState } from "react";
import { useGetAllCertificatesQuery } from "../../../api/apiSlice";
import CustomLoader from "../../../components/CustomLoader";
import CustomModal from "../../../components/CustomModal";
import Pagination from "../../../components/Pagination";
import ReusableTable from "../../../components/ReusableTable";
import Header from "../../../ui/Header";
import StarRating from "../../admin/components/StarRating";
import OwnerCertificateDetail from "./OwnerCertificateDetail";
import { dateFormat, useDebounce } from "../../../utils/Helper";
// import CertificateDetail from "./CertificateDetail";

const OwnerCertificates = () => {
    const [query, setQuery] = useState('');
    const [isModal, setIsModal] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedQuery = useDebounce(query, 500);
    const { data: allCertificates, isLoading } = useGetAllCertificatesQuery({ page: currentPage, limit: 10, ratingType: debouncedQuery, })
    const [currentCertificateId, setCurrentCertificateId] = useState(null)
    const handleModal = (row) => {
        setIsModal(true);
        setCurrentCertificateId(row?._id)
    };

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
            header: 'Customers', accessor: 'customer', render: ({ customer }) => {
                const { data } = customer
                const { customer_first_name, customer_last_name } = data
                return (
                    <div>{`${customer_first_name} ${customer_last_name}`.trim() || '--'}</div>
                )
            }
        },
        { header: 'Certificate Type', accessor: 'certificateType' },
        {
            header: 'Current Rating', accessor: 'currentRating', render: ({ currentRating }) => {
                // console.log(value, 'value')
                return (
                    <>
                        <StarRating rating={currentRating} />
                        <span className="text-gray-800 ml-2">
                            {currentRating || 0}
                        </span>
                    </>
                )
            }
        },
        {
            header: 'Status', accessor: 'ratingType', render: ({ ratingType }) => {
                return (
                    <div className={ratingType === 'Active' ? `text-green-400` : `text-red-400`} >{ratingType || '---'}</div>
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

    ];
    useEffect(() => {
        if (debouncedQuery !== query) {
            setCurrentPage(1);
        }
    }, [debouncedQuery, query]);
    // console.log(allCertificates?.data?.certificates, 'allCertificates')
    return (
        <>
            {isLoading ? <CustomLoader /> : (
                <>
                    <Header value={query} onChange={(e) => setQuery(e.target.value)}></Header>
                    <ReusableTable columns={columns} data={allCertificates?.data?.certificates} onClick={handleModal} />
                    <Pagination
                        totalCount={allCertificates?.data?.count}
                        totalPages={allCertificates?.data?.pages}
                        currentPage={allCertificates?.data?.page}
                        onPageChange={handlePageChange}

                    />
                    <CustomModal isOpen={isModal} title='Certificate Details' onClose={handleClose}>

                        <OwnerCertificateDetail id={currentCertificateId} />
                    </CustomModal>
                </>
            )}
        </>
    )
}

export default OwnerCertificates