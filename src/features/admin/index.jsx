import { useState } from 'react'
import { useDashboardOrderAnalyticsQuery, useGetDashoardCertificatesQuery, useInspectorsDashboardQuery } from '../../api/apiSlice'
import Cards from '../../components/Cards'
import CustomLoader from '../../components/CustomLoader'
import SelectDropdown from '../../components/SelectDropdown'
import { Months } from '../../mock/data'
import Analytics from './components/Analytics'
import Certifications from './components/Certifications'
import EnvironmentalQuality from './components/EnvironmentalQuality'
import MoldMapping from './components/MoldMapping'

const AdminDashboard = () => {
    const [timeFrame, setTimeFrame] = useState('Monthly');
    const { data: dashboardData, isLoading: cardLoader } = useInspectorsDashboardQuery();
    const { data: dashboardCertificates, isLoading: certificateLoader, refetch, isFetching } = useGetDashoardCertificatesQuery()
    const { data: orderAnalytics, isLoading: orderLoader } = useDashboardOrderAnalyticsQuery();
    const handleChange = (e) => {
        setTimeFrame(e.target.value)
    }
    const isLoading = cardLoader || certificateLoader || orderLoader;
    // console.log(orderAnalytics?.data, 'orderAnalytics')
    return (

        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className="text-xl font-semibold mb-6">Total Summary</h2>
                        <SelectDropdown onChange={handleChange} value={timeFrame} options={Months} />
                    </div>
                    <Cards item={dashboardData?.data} />
                    <div className='flex justify-between gap-4 p-3 mt-4'>
                        <Analytics analytics={orderAnalytics?.data} />
                        <Certifications data={dashboardCertificates?.data?.certificates} refetch={refetch} isLoading={isFetching} />
                    </div>
                    <div className='flex justify-between gap-4 p-3 mt-4'>
                        <EnvironmentalQuality />
                        <MoldMapping />
                    </div>
                </>
            )}
        </>
    )
}

export default AdminDashboard