import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import OverViewChart from './OverViewChart';
import RiskFactors from './RiskFactors';
import { useState } from 'react';
import { Months } from '../../../mock/data';
import SelectDropdown from '../../../components/SelectDropdown';

const OverViewOfMolding = ({ data }) => {
    const [timeFrame, setTimeFrame] = useState('Monthly');

    const handleChange = (e) => {
        setTimeFrame(e.target.value)
    }
    // console.log(data, 'data in OverViewOfMolding');
    const array = Object.entries(data?.performance).map(([key, value]) => ({
        name: key,
        value: value
    }));
    return (
        <>
            <div className='flex justify-between items-center mb-8'>
                <h2 className="text-xl font-semibold mb-6">Overview of Molding & Air Quality</h2>
                <SelectDropdown onChange={handleChange} value={timeFrame} options={Months} />
            </div>
            <div className='flex gap-4'>
                <div className='flex items-center flex-wrap max-w-3xl'>
                    {array?.map((item, index) => (
                        <OverViewChart item={item} key={index} />
                    ))}
                </div>
                <div className='flex-1'>
                    <RiskFactors risk={data?.otherRisks} />
                </div>

            </div>
        </>
    )
}

export default OverViewOfMolding