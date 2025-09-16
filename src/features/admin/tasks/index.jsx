import React, { useState } from 'react'
// import { Months } from '../../../mock/data';
import Header from '../../../ui/Header';
import FilterDropdown from '../../../components/FilterDropdown';
import CustomButton from '../../../components/CustomButton';
import Tabs from '../../../components/Tabs';
import AssignedTasks from './AssignedTasks';
import UnAssignedTasks from './UnAssignedTasks';
import { Months } from '../../../mock/data';

const Tasks = () => {
    const [query, setQuery] = useState('');
    const [timeFrame, setTimeFrame] = useState('Monthly');
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['Assigned Tasks', 'Unassigned Tasks'];

    const handleTabChange = (tab, index) => {
        setActiveTab(index);
    };


    return (
        <>
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            <Header value={query} onChange={(e) => setQuery(e.target.value)} placeholder='search...'>
                {activeTab === 0 && <FilterDropdown value={timeFrame} options={Months} onChange={(e) => setTimeFrame(e.target.value)} />}
            </Header>
            <div className="mt-6 p-4 ">
                {activeTab === 0 && (
                    <AssignedTasks query={query} timeFrame={timeFrame} />
                )}

                {activeTab === 1 && (
                    <UnAssignedTasks query={query} />
                )}
            </div>

        </>
    )
}

export default Tasks