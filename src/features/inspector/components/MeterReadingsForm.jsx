import { Field } from "formik";

const MeterReadingsForm = ({ name }) => {
    const gasReadings = [
        { label: "Carbon Dioxide (CO2)", name: 'co2', value: "30 ppm" },
        { label: "Water Content (H2O)", name: 'h2o', value: "30 ppm" },
        { label: "Carbon Monoxide (CO)", name: 'co', value: "30 ppm" },
        { label: "Oil Mist (at NTP)", name: 'NTP', value: "30 ppm" }
    ];
    return (
        <div className="flex items-center ">
            <h3 className="font-semibold text-gray-800 ">Meter Readings:</h3>
            <div className="grid grid-cols-4 gap-2">
                {gasReadings.map((reading, index) => (
                    <div key={index}>
                        <label >{reading?.label}</label>
                        <Field
                            type='number'
                            name={`${name}.${reading?.name}`}
                            placeholder="Text Area"
                            className=' w-full border border-gray-500 rounded placeholder:items-center p-2'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MeterReadingsForm