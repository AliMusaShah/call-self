import { CiMapPin } from 'react-icons/ci'
import MapComponent from './MapComponent'

const Location = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-3/4" >
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Location
                </h3>
                <p className="text-sm text-gray-600">
                    Track the status of your shift applications
                </p>
            </div>

            {/* Address */}
            <div className="mb-4">
                <p className="text-gray-900 font-medium">
                    123 Wellness Ave, Los Angeles, CA 90210
                </p>
                <p className="text-sm text-gray-600 mt-1">
                    EHR System, WebPT
                </p>
            </div>

            <MapComponent />
        </div>
    )
}

export default Location