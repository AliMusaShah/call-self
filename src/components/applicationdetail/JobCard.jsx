import React from 'react'
import { CiLock } from 'react-icons/ci'
import EhrCard from '../dashboard/shift/EhrCard'
import CustomButton from '../CustomButton'
import StatusBadge from '../dashboard/shift/StatusBadge'
import RateShiftInfo from '../dashboard/shift/RateShiftInfo'
import JobCardHeader from './JobCardHeader'

const JobCard = () => {
    return (
        <div className=" bg-white rounded-lg shadow-lg border border-gray-200 space-y-2 p-6">
            {/* Header */}


            <JobCardHeader title={'Outpatient PT - Orthopedic'} clinic={'Downtown Clinic'} patients={'12-15'} />
            <EhrCard />
            <div className='flex justify-end'>
                <StatusBadge status={'completed'} />
            </div>
            <RateShiftInfo
                hourlyRate={'80'}
                shiftDate={'Aug 24, 2023'}
                startTime={'9:00 AM'}
                endTime={'5:00 PM'}
            />
            <div className='flex justify-end mt-4'>
                <CustomButton
                    variant='normal'
                    size='md'
                    to={'/application/123'}
                >
                    Apply Now
                </CustomButton>
            </div>
        </div>
    )
}

export default JobCard