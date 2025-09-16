import React from 'react';

const TabItem = ({ label, isActive, onClick, }) => {
    return (
        <button
            className={`px-6 py-3 text-lg font-medium transition-colors duration-200 cursor-pointer ${isActive
                ? 'bg-blue-100 text-blue-500 rounded-lg'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
const Tabs = ({ tabs, activeTab, onTabChange, style }) => {
    return (
        <div className={`flex space-x-2 bg-white p-2 rounded-lg   ${style}`}>
            {tabs.map((tab, index) => (
                <TabItem
                    key={index}
                    label={tab}
                    isActive={activeTab === index}
                    onClick={() => onTabChange(tab, index)}
                />
            ))}
        </div>
    );
};
export default Tabs;