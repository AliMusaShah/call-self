
const Legend = ({ color, text }) => {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 border border-transparent ${color} rounded`}></div>
            <span className="text-gray-600">{text}</span>
        </div>
    )
}

export default Legend