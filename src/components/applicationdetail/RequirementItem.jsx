import { FiCheckCircle } from "react-icons/fi";

const RequirementItem = ({ title, description }) => {
    return (
        <div className="flex items-start space-x-3 ">
            <FiCheckCircle className="w-5 h-5 text-green-600" />
            {/* <div className="flex-shrink-0 mt-0.5">
            </div> */}
            <div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {title}
                </h4>
                <p className="text-sm text-gray-600">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default RequirementItem