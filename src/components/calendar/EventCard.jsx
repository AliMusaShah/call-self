import React from 'react'
import { statusColorClasses } from '../../mock/data'
import CustomButton from '../CustomButton'

const EventCard = ({
    day = "Monday",
    date = "March 12, 2024",
    startTime = "8:00 AM",
    endTime = "4:00 PM",
    status = "Visible",
    statusColor = "red",
    bgColor = 'bg-gray-50'
}) => {


    return (
        <div className={`${bgColor} p-2`}>
            <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{day}</h3>
                <CustomButton size='sm' className={`rounded-full border text-xs px-2 py-0  ${statusColorClasses[statusColor] || statusColorClasses.gray}`}>
                    {status}
                </CustomButton>
            </div>
            <div className="text-sm text-gray-600">
                <div>{date}</div>
                <div className="mt-1">{startTime} - {endTime}</div>
            </div>
        </div>
    )
}

export default EventCard