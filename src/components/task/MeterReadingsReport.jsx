
const MeterReadingsReport = ({ readings }) => {


    const { meterReadings } = readings
    const gasReadings = [
        { label: "Carbon Dioxide (CO2)", value: `${meterReadings?.co2 || 0} ppm` },
        { label: "Water Content (H2O)", value: `${meterReadings?.h2o || 0} ppm` },
        { label: "Carbon Monoxide (CO)", value: `${meterReadings?.co || 0} ppm` },
        { label: "Oil Mist (at NTP)", value: `${meterReadings?.NTP || 0} ppm` }
    ];

    return (
        <div className="flex items-center  gap-8">
            <h3 className="font-semibold text-gray-800 mb-3">Meter Readings:</h3>
            <div className="grid grid-cols-4 gap-5">
                {gasReadings.map((reading, index) => (
                    <div key={index} className="text-sm">
                        <div className="font-medium text-gray-700">{reading.label}</div>
                        <div className="text-gray-600">{reading.value}</div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default MeterReadingsReport