import { CiStar } from "react-icons/ci";

const RatingBar = ({ stars, count, totalReviews }) => {
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

    return (
        <div className="flex items-center space-x-3 mb-2">
            {/* Star number and icon */}
            <div className="flex items-center space-x-1 w-6">
                <span className="text-sm text-gray-700">{stars}</span>
                <CiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            </div>

            {/* Progress bar */}
            <div className="flex-1 bg-gray-300 rounded-full h-2">
                <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Count */}
            <div className="w-8 text-right">
                <span className="text-sm text-gray-700">{count}</span>
            </div>
        </div>
    )
}

export default RatingBar