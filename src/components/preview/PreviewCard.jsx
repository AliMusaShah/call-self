
const PreviewCard = ({ shifts, style }) => {
    return (
        <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Upcoming Shifts</h3>

            {shifts.length === 0 ? (
                <div className="text-gray-500 text-sm py-4">
                    No upcoming shifts scheduled
                </div>
            ) : (
                <div className="space-y-4">
                    {shifts.map((shift, index) => (
                        <div key={index} className=" bg-gray-100  pl-4 py-2">
                            <div className="font-medium text-gray-900 mb-1">
                                {shift.title}
                            </div>
                            <div className={`text-sm  ${style} font-medium`}>
                                {/* {formatShiftDate(shift.date)} • {formatShiftTime(shift.startTime, shift.endTime)} */}
                                March 12, 20248:00 AM - 4:00 PM
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PreviewCard