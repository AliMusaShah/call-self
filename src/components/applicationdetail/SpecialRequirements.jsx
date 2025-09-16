import React from 'react'
import RequirementItem from './RequirementItem'

const SpecialRequirements = () => {
    return (
        <div className="bg-white rounded-lg p-6 my-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Special Requirements
            </h3>

            <div className="flex items-start justify-between w-3/4">
                <RequirementItem
                    title="Experience Required"
                    description="Experience with orthopedic rehab preferred"
                />

                <div className="ml-8">
                    <RequirementItem
                        title="Certification"
                        description="CPR Certification required"
                    />
                </div>
            </div>
        </div>
    )
}

export default SpecialRequirements