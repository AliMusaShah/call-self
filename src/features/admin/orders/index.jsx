import { useState } from "react";
import { Months } from "../../../mock/data";
import Tabs from "../../../components/Tabs";
import Header from "../../../ui/Header";
import AssignedTasks from "../tasks/AssignedTasks";
import UnAssignedTasks from "../tasks/UnAssignedTasks";
import FilterDropdown from "../../../components/FilterDropdown";
import ListingView from "./ListingView";
import Calendar from "./Calendar";
import CalendarView from "./CalendarView";

const Orders = () => {
    const [query, setQuery] = useState('');
    const [timeFrame, setTimeFrame] = useState('Monthly');
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['Listing View', 'Calendar'];

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
            {activeTab === 0 && <Header value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search by status....'>
                <FilterDropdown value={timeFrame} options={Months} onChange={(e) => setTimeFrame(e.target.value)} />
            </Header>}
            <div className="mt-4 p-2  ">
                {activeTab === 0 && (
                    <ListingView status={query} filterBy={timeFrame} />
                )}

                {activeTab === 1 && (
                    <CalendarView />
                )}
            </div>
        </>
    )
}

export default Orders