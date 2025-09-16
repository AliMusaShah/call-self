import React from 'react'

const EhrCard = () => {
    return (
        <div className="bg-gray-200 rounded-lg p-4 space-y-1 inline-block" >
            <div className="text-sm font-medium text-gray-900">EHR: EPIC</div>
            <div className="text-sm text-gray-700">New Evals: 2 new evaluations</div>
            <div className="text-sm text-gray-700">Complexity: Standard</div>
        </div>
    )
}

export default EhrCard