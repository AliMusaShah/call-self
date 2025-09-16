import { useState } from "react";
import Cards from "../../components/Cards";
import SelectDropdown from "../../components/SelectDropdown";
import { Months } from "../../mock/data";
import OverViewOfMolding from "./components/OverViewOfMolding";
import SummaryMonitor from "./components/SummaryMonitor";
import OwnerCards from "./components/OwnerCards";
import { useHomneOwnerDashboardQuery } from "../../api/apiSlice";
import CustomLoader from "../../components/CustomLoader";
import NoDataFound from "../../components/NoDataFound";


const OwnerDashboard = () => {
    const { data: dashboardData, isLoading } = useHomneOwnerDashboardQuery()
    const [timeFrame, setTimeFrame] = useState('Monthly');

    const handleChange = (e) => {
        setTimeFrame(e.target.value)
    }
    // console.log(dashboardData?.message, 'dashboardData')
    return (
        <>
            {isLoading ? <CustomLoader /> : (
                <>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className="text-xl font-semibold mb-6">Total Summary</h2>
                        <SelectDropdown onChange={handleChange} value={timeFrame} options={Months} />
                    </div>
                    {dashboardData?.data ?
                        <>
                            <OwnerCards data={dashboardData?.data?.environmental} />
                            <div className='flex justify-between gap-4 p-3 mt-4'>
                                <div className="w-3/4">
                                    <OverViewOfMolding data={dashboardData?.data} />
                                </div>
                                <SummaryMonitor monitors={dashboardData?.data} />
                            </div>
                        </>
                        :
                        <NoDataFound message={dashboardData?.message} />
                    }
                </>
            )}

        </>
    )
}

export default OwnerDashboard