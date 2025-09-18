import { useParams } from 'react-router-dom'
import { useGetInspectionTasksByTypeQuery } from '../../../../api/apiSlice'
import CustomLoader from '../../../../components/CustomLoader'
import InspectionDetailArea from '../../../../components/task/InspectionDetailArea'
import InspectionSection from '../../../../components/task/InspectionSection'
import FindingsReport from '../../../../components/task/FindingsReport'
import PremisesDetails from '../../../../components/task/PremisesDetails'
import InspectorTaskHeader from '../../components/InspectorTaskHeader'
import MeterReadingsReport from '../../../../components/task/MeterReadingsReport'
import NoDataFound from '../../../../components/NoDataFound'
import { useState } from 'react'
import Tabs from '../../../../components/Tabs'

const InspectorTaskDetail = () => {
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['Pre-Inspection', 'Post-Inspection'];
    const [type, settype] = useState('Pre-Inspection')
    const { data: taskDetail, isLoading } = useGetInspectionTasksByTypeQuery({ id, type: type })
    const handleTabChange = (tab, index) => {
        setActiveTab(index);
        settype(tab);
    };
    // if (taskDetail?.message === 'No reports found.') return <NoDataFound />
    // console.log(taskDetail?.data?.report, 'taskDetail')
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        style='justify-end'
                    />
                    {taskDetail?.message === 'No reports found.' ? <NoDataFound /> : (
                        <>
                            <InspectorTaskHeader data={taskDetail?.data} />
                            <PremisesDetails
                                facilityType={taskDetail?.data?.premisesDetails}
                                floorPlan={taskDetail?.data?.floorPlan}
                            />

                            <InspectionSection >
                                {taskDetail?.data?.report.map((section, index) => (
                                    <InspectionDetailArea title={section?.sectionName} key={index}>
                                        {section?.findings.map((finding, index) => (
                                            <FindingsReport key={index} data={finding}>
                                                <MeterReadingsReport readings={finding?.standardInfo} />
                                            </FindingsReport>
                                        ))}
                                    </InspectionDetailArea>
                                ))}
                            </InspectionSection>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default InspectorTaskDetail