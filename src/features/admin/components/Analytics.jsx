import React, { useState } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceArea
} from 'recharts';
import SelectDropdown from '../../../components/SelectDropdown';
import { Months } from '../../../mock/data';
import { RiArrowDropDownLine } from 'react-icons/ri';

const Analytics = ({ analytics }) => {
    const [timeFrame, setTimeFrame] = useState('Monthly');


    const handleChange = (e) => {
        setTimeFrame(e.target.value)
    }
    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }) => {

        if (active && payload && payload.length) {
            return (

                <div className="bg-white p-4 shadow-md rounded-md border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-2">{`Month: ${label}`}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 mb-1">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            ></div>
                            <span className="capitalize text-sm">
                                {entry.name}: <span className="font-medium">{entry.value}</span>
                            </span>
                        </div>
                    ))}

                </div>
            );
        }

        return null;
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-auto md:w-5xl ">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Orders Analytics</h2>

                <div className="flex items-center">
                    <div className="flex items-center space-x-6 mr-6">
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-gray-800 mr-2"></div>
                            <span className="text-sm text-gray-600">Home</span>
                        </div>

                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm text-gray-600">Villa</span>
                        </div>

                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-orange-400 mr-2"></div>
                            <span className="text-sm text-gray-600">Office</span>
                        </div>
                    </div>

                    <SelectDropdown onChange={handleChange} value={timeFrame} options={Months} />
                </div>
            </div>

            {/* Chart container with fixed height */}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={analytics}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            domain={[0, 100]}
                            ticks={[0, 20, 40, 60, 80, 100]}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {/* Reference area for highlighting */}
                        <ReferenceArea x1="Apr" x2="May" y1={0} y2={100} fill="#f3f4f6" opacity={0.3} />

                        <Line
                            type="monotone"
                            dataKey="home"
                            stroke="#1f2937"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, stroke: '#1f2937', strokeWidth: 2, fill: '#fff' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="villa"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="office"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

}

export default Analytics