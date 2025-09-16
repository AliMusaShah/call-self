import React, { useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
// import { Calendar } from 'lucide-react';

const DateSortComponent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className="flex items-center gap-6 p-4 bg-white">
            <div className="text-gray-600 font-medium">
                Sort By:
            </div>

            <div className="flex items-center gap-4">
                {/* Start Date */}
                <div className="relative">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </div>
                    <div className="relative">
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="w-40 px-3 py-2 border border-gray-300 rounded-md text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="MM/DD/YYYY"
                        />
                        <BiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* End Date */}
                <div className="relative">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </div>
                    <div className="relative">
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="w-40 px-3 py-2 border border-gray-300 rounded-md text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="MM/DD/YYYY"
                        />
                        <BiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateSortComponent;