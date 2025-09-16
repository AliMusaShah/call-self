const FloorPlanItem = ({ icon, count, label }) => {
    return (
        <div className="flex items-center mr-4">
            {icon}
            <span className="ml-1 text-gray-700">
                {count} {label}
            </span>
        </div>
    );
};
export default FloorPlanItem;