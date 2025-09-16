import React from 'react'

const CustomCardHeader = ({ title, text }) => {
    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h2>
            <p className="text-gray-600 mb-3">
                {text}
            </p>

        </div>
    )
}

export default CustomCardHeader