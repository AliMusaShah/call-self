import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useDeleteInspectionFormMutation, useDublicateFormMutation, useGetAllInspectionFormQuery, useUpdateInspectionFormStatusMutation } from "../../../api/apiSlice";
import CustomButton from "../../../components/CustomButton";
import CustomLoader from "../../../components/CustomLoader";
import FilterDropdown from "../../../components/FilterDropdown";
import Pagination from "../../../components/Pagination";
import ReusableTable from "../../../components/ReusableTable";
import StatusToggle from "../../../components/StatusToggle";
import { Months } from "../../../mock/data";
import Header from "../../../ui/Header";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { dateFormat, useDebounce } from "../../../utils/Helper";
import NoDataFound from "../../../components/NoDataFound";

const Forms = () => {
    const [query, setQuery] = useState('');
    const [timeFrame, setTimeFrame] = useState('Monthly');
    const [deletingId, setDeletingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedQuery = useDebounce(query, 500);
    const { data: allInspectionForm, isLoading } = useGetAllInspectionFormQuery({ page: currentPage, limit: 10, title: debouncedQuery, filterBy: timeFrame })
    const [updateInspectionFormStatus] = useUpdateInspectionFormStatusMutation()
    const [deleteInspectionForm, { isLoading: deleteLoader }] = useDeleteInspectionFormMutation()
    const [DublicateForm] = useDublicateFormMutation()
    const navigate = useNavigate()
    // const [isModal, setIsModal] = useState(null);
    // const handleModal = (id) => {
    //     setIsModal(id);
    // };
    const handleEdit = (row) => {
        // console.log(row, 'row')
        navigate('/forms/addnewform', { state: { formId: row?._id } })
    };
    const handleDelete = async (row) => {
        setDeletingId(row._id);
        try {
            await deleteInspectionForm(row?._id).unwrap()
            setDeletingId(null);
        } catch (error) {
            console.log(error)
            setDeletingId(null);
        }
    };
    const handleCopy = async (row) => {
        try {
            // console.log(row)
            await DublicateForm(row?._id).unwrap()
        } catch (error) {
            console.log(error)
        }
    };
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
        { header: 'Form Title', accessor: 'title' },
        { header: 'Type', accessor: 'formType' },
        {
            header: 'No. of Sections', accessor: 'sections', render: ({ sections }) => {
                return (
                    <div>{sections?.length}</div>
                )
            }
        },
        {
            header: 'Status',
            render: (row) => (
                <StatusToggle
                    key={row?._id}
                    row={row}
                    onToggle={(row, newState) => {
                        // Handle the toggle state change here
                        updateInspectionFormStatus({ id: row?._id, payload: newState })

                    }}
                />
            )
        },
        {
            header: 'Created Date', accessor: 'createdAt', render: ({ createdAt }) => (
                <div>{dateFormat(createdAt)}</div>
            )
        },
        {
            header: 'Action',
            render: (row) => (

                <div className='flex gap-2'>

                    {/* {row?.formType !== 'master' && ( */}
                    <button
                        type='button'
                        className='w-[35px] h-[35px] rounded-[99px]  bg-[#0095FF1A] text-primary text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                        onClick={() => handleEdit(row)}
                    >
                        <CiEdit />
                    </button>
                    {/* )} */}
                    {row?.status === 'false' && row?.formType !== 'master' && (<button
                        type='button'
                        className=' rounded-[99px] bg-[#FFF2F2] text-red-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                        onClick={() => handleDelete(row)}
                    >
                        {deletingId === row._id && deleteLoader ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                        ) : (
                            <AiOutlineDelete size={22} />
                        )}
                    </button>)}

                    {row?.formType === 'master' &&
                        (
                            <button
                                type='button'
                                className=' rounded-[99px] bg-[#0095FF1A] text-primary text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg*:
                                    disabled:bg-gray-200 disabled:cursor-not-allowed
                                `'
                                onClick={() => handleCopy(row)}
                            >
                                <MdContentCopy size={22} />
                            </button>
                        )
                    }
                </div>
            ),

        },
    ];

    // console.log(allInspectionForm?.data, 'allInspectionForm')
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <Header value={query} onChange={(e) => setQuery(e.target.value)}>
                        <FilterDropdown value={timeFrame} options={Months} onChange={(e) => setTimeFrame(e.target.value)} />
                        <CustomButton size='md' to='/forms/addnewform'>
                            Add Form +
                        </CustomButton>
                    </Header>

                    {allInspectionForm?.data?.inspectionForm && allInspectionForm?.data?.inspectionForm.length > 0 ? <>
                        <ReusableTable columns={columns} data={allInspectionForm?.data?.inspectionForm} />
                        <Pagination totalCount={allInspectionForm?.data?.count}
                            totalPages={allInspectionForm?.data?.pages}
                            currentPage={allInspectionForm?.data?.page}
                            onPageChange={handlePageChange}

                        />

                    </> : <NoDataFound />
                    }
                </>
            )}
        </>
    )
}

export default Forms