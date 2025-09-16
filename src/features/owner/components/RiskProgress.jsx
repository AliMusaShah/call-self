
const RiskProgress = ({ title, progress }) => {
    return (
        <div className=" border border-gray-200 rounded-lg p-4 w-full  ">
            <div className="text-gray-900 font-medium text-sm mb-3">
                {title}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-[var(--defaultBlue)] h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}

export default RiskProgress