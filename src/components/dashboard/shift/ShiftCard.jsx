import React from 'react'
import EhrCard from './EhrCard';
import CustomButton from '../../CustomButton';
import StatusBadge from './StatusBadge';
import RateShiftInfo from './RateShiftInfo';
import JobCardHeader from '../../applicationdetail/JobCardHeader';

const ShiftCard = ({
    title,
    clinic,
    hourlyRate,
    applicantCount = 0,
    status = 'pending',
    shiftDate,
    startTime,
    endTime,
    // onViewDetails,
    className = '',
    patients = '12-15'
}) => {


    const formatApplicants = (count) => {
        if (count === 0) return 'No applicants';
        if (count === 1) return '1 Applicant';
        return `${count} Applicants`;
    };


    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    {/* <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {title}
                    </h2>
                    <p className="text-gray-500 mb-3">{clinic}</p> */}
                    <JobCardHeader title={title} clinic={clinic} patients={patients} />
                    <div className="flex items-center gap-4">
                        <>
                            <span className="text-green-500 font-medium">${hourlyRate}/hr</span>
                            <span className="text-blue-500 font-medium">{formatApplicants(applicantCount)}</span>
                        </>
                    </div>
                    <EhrCard />
                </div>

                <div className="flex flex-col justify-between h-full items-end gap-3">
                    <StatusBadge status={status} />
                    <RateShiftInfo

                        hourlyRate={hourlyRate}
                        shiftDate={shiftDate}
                        startTime={startTime}
                        endTime={endTime}
                    />
                </div>

            </div>

            <div className="flex justify-end ">
                <CustomButton
                    variant='normal'
                    size='md'
                    to={'/application/123'}
                >
                    View Details
                </CustomButton>
            </div>
        </div>
    )
}

export default ShiftCard