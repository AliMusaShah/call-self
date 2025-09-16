
const StarRating = ({ rating = 0, maxStars = 5 }) => {
    return (
        <span className="text-blue-500">
            {Array.from({ length: maxStars }, (_, index) => (
                <span key={index}>
                    {index < Math.floor(rating) ? '★' : '☆'}
                </span>
            ))}
        </span>
    )
}

export default StarRating