import React from 'react'
import TitleComponent from '../../../components/dashboard/shift/TitleComponnet';
import CustomButton from '../../../components/CustomButton';
import ApplicationsListings from '../dashboard/components/ShiftListings';
import CalendarPreiview from '../dashboard/components/CalendarPreiview';
import Location from '../../../components/applicationdetail/Location';
import JobCard from '../../../components/applicationdetail/JobCard';
import SpecialRequirements from '../../../components/applicationdetail/SpecialRequirements';
import Rating from '../../../components/applicationdetail/Rating';

const ApplicationDetail = () => {
    const isLoading = false;
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <div className='flex items-center justify-between '>
                        <div className='flex items-center '>
                            <CustomButton
                                to={'-1'}
                            >
                            </CustomButton>
                            <TitleComponent title="Horizon Rehab Center" />
                        </div>
                        <CustomButton
                            variant="orange"
                            size="md"
                            onClick={() => alert('Accept Application')}
                        >
                            Chat with clinic
                        </CustomButton>
                    </div>
                    {/* <div className='flex justify-between items-center '>
                    </div> */}
                    <div className='flex justify-between gap-4 p-3 mt-4'>
                        <Location />
                        <JobCard />
                    </div>
                    <SpecialRequirements />
                    <Rating />
                </>
            )}
        </>
    )
}

export default ApplicationDetail