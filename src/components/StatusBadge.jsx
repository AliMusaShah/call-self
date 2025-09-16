import { getStatusStyles } from "../utils/Helper";




const StatusBadge = ({ status }) => {


    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(status)}`}>
            {status}
        </span>
    );
};

export default StatusBadge