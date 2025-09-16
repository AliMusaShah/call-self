import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const OverViewChart = ({ item }) => {
    const comfortLevel = item?.value?.value; // Your actual percentage value
    const name = item?.name; // The name of the item, if needed   
    const data = [
        { name: 'Filled', value: comfortLevel },
        { name: 'Empty', value: 100 - comfortLevel }
    ];
    const getFilledColor = (value) => {
        if (!value || value === 0) return '#E5E7EB'; // No data
        if (value < 50) return '#FF3B30'; // Red
        if (value >= 50 && value < 75) return '#FF9500'; // Orange
        return '#00C7BE'; // Teal/Green for >= 75
    };

    const colors = [getFilledColor(comfortLevel), '#E5E7EB'];
    return (
        <div className="bg-gray-50  rounded-3xl max-w-lg font-sans">
            <div className="relative ">
                <div className="w-64 h-64 mx-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={90}
                                outerRadius={110}
                                paddingAngle={2}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className=" text-gray-900 capitalize">{name}</div>
                    <div className="text-xs  text-gray-900">Level</div>
                    <div className="text-gray-500 text-3xl font-bold">{comfortLevel}</div>
                </div>
            </div>


        </div>
    )
}

export default OverViewChart