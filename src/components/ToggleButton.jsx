
const ToggleButton = ({ title, onToggle, isToggled, isOn }) => {
    // console.log(isToggled, 'isToggled in ToggleButton');
    return (
        <div className="flex items-center justify-between gap-2 text-gray-500 text-xs  p-2">
            <span className="text-sm text-gray-600">{title}</span>
            <button
                onClick={onToggle}
                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ${isOn ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
            >
                <span
                    className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${isOn ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    )
}

export default ToggleButton