
const JobCardHeader = ({ title, clinic, patients }) => {
    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h2>
            <p className="text-gray-600 mb-3">
                {clinic}
            </p>
            <p className="text-gray-700 font-medium">
                {patients} patients
            </p>
        </div>
    )
}

export default JobCardHeader