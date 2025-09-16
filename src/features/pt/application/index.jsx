import React from 'react'
import CustomLoader from '../../../components/CustomLoader';
import ApplicationsListings from '../dashboard/components/ShiftListings';
import TitleComponent from '../../../components/dashboard/shift/TitleComponnet';
import { sampleJobs } from '../../../mock/data';
import ShiftCard from '../../../components/dashboard/shift/ShiftCard';

const MyApplication = () => {
    const isLoading = false;
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <TitleComponent title="My Application" />
                    <div className="space-y-4">
                        {sampleJobs.map((job, index) => (
                            <ShiftCard
                                key={index}
                                title={job.title}
                                clinic={job.clinic}
                                hourlyRate={job.hourlyRate}
                                applicantCount={job.applicantCount}
                                status={job.status}
                                shiftDate={job.shiftDate}
                                startTime={job.startTime}
                                endTime={job.endTime}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default MyApplication