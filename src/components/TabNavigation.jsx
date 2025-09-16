import CustomButton from "./CustomButton";

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
    return (
        <div className="flex space-x-8 m-6 border-b border-gray-200">
            {tabs.map((tab) => (
                <CustomButton
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    variant={activeTab === tab ? 'default' : 'normal'}
                    size="lg"
                >
                    {tab}
                </CustomButton>
            ))}
        </div>

    );
};
export default TabNavigation;