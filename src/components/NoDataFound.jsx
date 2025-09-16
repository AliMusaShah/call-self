import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomButton from './CustomButton'

const NoDataFound = ({
    title = "No data found",
    message = "We couldn't find any data to display.",
    buttonText = "Go Back",
    showBtn = false
}) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">

            <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                {title}
            </h3>

            <p className="text-gray-600 mb-6 max-w-md capitalize">
                {message}
            </p>
            {showBtn && <CustomButton type="button" size="md" variant='primary' onClick={() => navigate(-1)} >
                {buttonText}
            </CustomButton>}
        </div>
    )
}

export default NoDataFound