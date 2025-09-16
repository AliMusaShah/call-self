import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const SummaryMonitor = ({ monitors }) => {

    const data = [
        { name: 'Good', value: monitors?.performanceBreakdown?.good, color: '#10B981' },
        { name: 'Poor', value: monitors?.performanceBreakdown?.poor, color: '#EF4444' },
        { name: 'Moderate', value: monitors?.performanceBreakdown?.moderate, color: '#F59E0B' }
    ];
    // const total = monitors?.summary?.totalMonitors || 0;
    const total = monitors?.performanceBreakdown?.total || 0;

    return (
        <div className="bg-gray-50 p-6 rounded-3xl max-w-sm  font-sans">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Monitor Summary</h2>
                <p>Past 7 days</p>
            </div>

            {/* Chart Container */}
            <div className="relative mb-6">
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
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-gray-900">{total}</div>
                    <div className="text-gray-500 text-sm">Monitors</div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-6">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SummaryMonitor