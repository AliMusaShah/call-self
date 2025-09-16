import ShiftCard from '../../../../components/dashboard/shift/ShiftCard';
import TitleComponent from '../../../../components/dashboard/shift/TitleComponnet';
import { sampleJobs } from '../../../../mock/data';

const ApplicationsListings = () => {
    const handleViewDetails = (title) => {
        alert(`Viewing details for: ${title}`);
    };
    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-3/4 max-h-[750px] overflow-y-auto">
            <TitleComponent title='Active Applications' />
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
                        onViewDetails={() => handleViewDetails(job.title)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ApplicationsListings