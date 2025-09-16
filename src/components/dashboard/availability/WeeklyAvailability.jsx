import Legend from "./Legend"


const WeeklyAvailability = () => {
    const weekDates = [
        { date: "Dec 17", status: "available" },
        { date: "Dec 18", status: "busy" },
        { date: "Dec 19", status: "available" },
        { date: "Dec 20", status: "available" },
        { date: "Dec 21", status: "busy" },
    ]
    return (
        <div className="bg-white p-2 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">This Week</h2>

            {/* Date boxes */}
            <div className="flex gap-2 mb-4">
                {weekDates.map((day, index) => (
                    <div
                        key={index}
                        className={`p-2  rounded-md text-xs font-medium block ${day.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                    >
                        {day.date}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 text-sm">
                <Legend color="bg-green-300" text="Available" />
                <Legend color="bg-red-300" text="Busy" />
            </div>
        </div>
    )
}

export default WeeklyAvailability