import { useState } from 'react';
import { useDashboardJobTypeQuery, useInspectorsDashboardQuery } from '../../api/apiSlice';
import Cards from '../../components/Cards';
import CustomLoader from '../../components/CustomLoader';
import SelectDropdown from '../../components/SelectDropdown';
import { Months } from '../../mock/data';
import JobTypeMonitor from './components/JobTypeMonitor';
import TopIssuesTable from './components/TopIssuesTable';

const InspectorDashboard = () => {
    const [timeFrame, setTimeFrame] = useState('Monthly');
    const { data: dashboardData, isLoading: dashboardLoader } = useInspectorsDashboardQuery();
    const { data: jobType, isLoading: jobTypeLoader } = useDashboardJobTypeQuery();



    const handleChange = (e) => {
        setTimeFrame(e.target.value)
    }

    // console.log(jobType?.data, 'jobType')
    const isLoading = dashboardLoader || jobTypeLoader;
    return (
        <>
            {isLoading ? <CustomLoader /> : (
                <>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className="text-xl font-semibold mb-6">Total Summary</h2>
                        <SelectDropdown onChange={handleChange} value={timeFrame} options={Months} />
                    </div>
                    <Cards item={dashboardData?.data} />
                    <div className='flex justify-between gap-4 p-3 mt-4'>
                        <JobTypeMonitor jobType={jobType?.data} />
                        <TopIssuesTable />
                    </div>
                </>
            )}

        </>
    )
}

export default InspectorDashboard