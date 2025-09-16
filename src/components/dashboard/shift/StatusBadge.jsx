const StatusBadge = ({ status }) => {
    const statusConfig = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
        active: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
        completed: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
        draft: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' }
    };
    const statusStyle = statusConfig[status.toLowerCase()] || statusConfig.pending;

    const formatStatus = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    return (
        <>
            <div className={`flex items-center ${statusStyle.bg} ${statusStyle.text} px-3 py-1 rounded-full text-sm font-medium`}>
                <div className={`w-2 h-2 ${statusStyle.dot} rounded-full mr-2`}></div>
                {formatStatus(status)}
            </div>

        </>
    );
}

export default StatusBadge;
