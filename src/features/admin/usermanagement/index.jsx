import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserStatusMutation } from "../../../api/apiSlice";
import CustomButton from "../../../components/CustomButton";
import FilterDropdown from "../../../components/FilterDropdown";
import Pagination from "../../../components/Pagination";
import ReusableTable from "../../../components/ReusableTable";
import StatusToggle from "../../../components/StatusToggle";
import { Months } from "../../../mock/data";
import Header from "../../../ui/Header";
import { dateFormat, useDebounce } from "../../../utils/Helper";
import NoDataFound from "../../../components/NoDataFound";
import CustomLoader from "../../../components/CustomLoader";
import { toast } from "react-toastify";

const UserManagement = () => {
    const [query, setQuery] = useState('');
    // const [isModal, setIsModal] = useState(null);
    const [timeFrame, setTimeFrame] = useState('Monthly');
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedQuery = useDebounce(query, 500);
    const { data: allUsers, isLoading } = useGetAllUsersQuery({ page: currentPage, limit: 10, fullName: debouncedQuery, filterBy: timeFrame })
    const [deleteUser] = useDeleteUserMutation()
    const [updateUserStatus] = useUpdateUserStatusMutation()
    const navigate = useNavigate()
    // const handleModal = (id) => {
    //     setIsModal(id);
    // };
    const handleDelete = async (row) => {
        // console.log(row, 'row')
        try {
            await deleteUser(row?._id).unwrap()
            toast.success('User Deleted Successfully')
        } catch (error) {
            console.log(error?.data?.message)
            toast.error(error?.data?.message || 'something went wrong try again')
        }
    }
    const handleEdit = (row) => {
        // console.log(row?._id, 'row')
        navigate(`/user-management/edituser/${row?._id}`)

    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const columns = [
        { header: 'Sr#', accessor: 'name' },
        { header: 'Name', accessor: 'fullName' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
        {
            header: 'Status',
            render: (row) => (
                <StatusToggle
                    row={row}
                    onToggle={(row, newState) => {
                        updateUserStatus({ id: row?._id, payload: newState })

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
    useEffect(() => {
        if (debouncedQuery !== query) {
            setCurrentPage(1);
        }
    }, [debouncedQuery, query]);
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <Header value={query} onChange={(e) => setQuery(e.target.value)}>
                        <FilterDropdown
                            value={timeFrame}
                            options={Months}
                            onChange={(e) => setTimeFrame(e.target.value)}
                        />
                        <CustomButton size='md' to='/user-management/adduser'>
                            Add User +
                        </CustomButton>
                    </Header>

                    {allUsers?.data.users && allUsers?.data.users.length > 0 ? (
                        <>
                            <ReusableTable columns={columns} data={allUsers?.data.users} />
                            <Pagination
                                totalCount={allUsers?.data?.count}
                                totalPages={allUsers?.data?.pages}
                                currentPage={allUsers?.data?.page}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <NoDataFound />
                    )}
                </>
            )}

        </>
    )
}

export default UserManagement