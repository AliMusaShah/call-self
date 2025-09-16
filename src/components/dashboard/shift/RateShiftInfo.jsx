import React from 'react'

const RateShiftInfo = ({ hourlyRate, shiftDate, startTime, endTime }) => {
    return (
        <div className="text-right">
            <div className="text-green-600 font-semibold text-lg">${hourlyRate}/hr</div>
            {shiftDate && <div className="text-gray-600 text-sm">Shift: {shiftDate}</div>}
            {startTime && endTime && (
                <div className="text-gray-600 text-sm">{startTime} - {endTime}</div>
            )}
        </div>
    )
}

export default RateShiftInfo