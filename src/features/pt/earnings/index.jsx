import Cards from "../../../components/Cards";
import CustomLoader from "../../../components/CustomLoader";
import StatusBadge from "../../../components/dashboard/shift/StatusBadge";
import TitleComponent from "../../../components/dashboard/shift/TitleComponnet";
import Pagination from "../../../components/Pagination";
import ReusableTable from "../../../components/ReusableTable";
import { sampleJobs } from "../../../mock/data";

const Earnings = () => {

    const columns = [
        {
            header: 'Clinic Name', accessor: 'clinic'
        },
        { header: 'Date', accessor: 'date' },
        { header: 'Amount', accessor: 'amount' },
        {
            header: 'Status', accessor: 'status', render: ({ status }) => (
                <div className=" inline-block">
                    <StatusBadge status={status} />
                </div>
            )
        },
    ];
    const isLoading = false;
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <TitleComponent title="Earnings" />
                    <Cards />
                    <ReusableTable columns={columns} data={sampleJobs} />
                    <Pagination

                        totalCount={12}
                        totalPages={20}
                        currentPage={1}
                    // onPageChange
                    />

                </>
            )}
        </>
    )
}

export default Earnings