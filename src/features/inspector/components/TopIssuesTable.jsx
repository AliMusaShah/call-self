import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { Months, topIssuesData } from '../../../mock/data';
import SelectDropdown from '../../../components/SelectDropdown';
import ReusableTable from '../../../components/ReusableTable';
// import { ChevronDown, ChevronUp } from 'lucide-react';

const TopIssuesTable = () => {
    const [timeFrame, setTimeFrame] = useState('Monthly');

    const handleChange = (e) => {
        setTimeFrame(e.target.value)
    }
    const getIssueColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-500';
            case 'medium':
                return 'bg-orange-500';
            case 'low':
                return 'bg-yellow-500';
            default:
                return 'bg-orange-500';
        }
    };
    const columns = [
        {
            header: 'Issues',
            accessor: 'issue',
            render: (value) => {
                return (
                    <div className={`inline-block px-3 py-1 ${getIssueColor(value.priority)} rounded text-white text-sm font-medium`}>
                        {value.issue}
                    </div>
                )
            }
        },
        {
            header: 'Type',
            accessor: 'type'
        },
        {
            header: 'Location Type',
            accessor: 'locationType'
        }
    ]


    return (
        <div className="bg-gray-50 p-6 rounded-2xl flex-1 font-sans">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Top Issues to Address</h2>
                <SelectDropdown onChange={handleChange} value={timeFrame} options={Months} />

            </div>
            <ReusableTable data={topIssuesData} columns={columns} />
        </div>
    );
};

export default TopIssuesTable;