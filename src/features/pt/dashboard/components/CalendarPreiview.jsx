import React from 'react'
import Header from '../../../../components/preview/Header'
import PreviewCard from '../../../../components/preview/PreviewCard'
import { sampleJobs } from '../../../../mock/data'
import WeeklyAvailability from '../../../../components/dashboard/availability/WeeklyAvailability'
import CustomButton from '../../../../components/CustomButton'

const CalendarPreiview = () => {
    return (
        <>
            <div className={`bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-between `}>
                <div>
                    <Header title="Calendar Preview" subtitle="Your availability and scheduled shifts" />
                    <PreviewCard shifts={sampleJobs} style='text-orange-600' />
                </div>
                <WeeklyAvailability />

                <CustomButton
                    size='lg'
                    variant='orange'
                >
                    + Add Availability
                </CustomButton>
            </div>
        </>
    )
}

export default CalendarPreiview