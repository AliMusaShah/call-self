const Card = ({ children, className = "" }) => {
    return (
        <div className={`rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
            {children}
        </div>
    );
};
export default Card;