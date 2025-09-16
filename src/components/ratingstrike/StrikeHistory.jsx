import React from 'react'
import { sampleJobs } from '../../mock/data'
import Header from '../preview/Header'
import EventCard from '../calendar/EventCard'
import VisibilitySettings from '../calendar/VisibilitySettings'

const StrikeHistory = () => {
    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4 justify-between  `}>
            <Header title="StrikeHistory" subtitle="Your Weekly Schedule" />
            <h3 className="text-base font-medium text-gray-900 mb-4">Upcoming Shifts</h3>
            {sampleJobs.map((job, index) => (
                <EventCard
                    key={index}
                    day="Tuesday"
                    date={job.shiftDate}
                    startTime={job.startTime}
                    endTime={job.startTime}
                    status="Hidden"
                    statusColor="red"
                />
            ))}
            <VisibilitySettings />
        </div>
    )
}

export default StrikeHistory