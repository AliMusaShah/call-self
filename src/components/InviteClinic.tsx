import React from 'react'
import CustomButton from './CustomButton'

const InviteClinic = () => {
    return (
        <div className=" p-8 rounded-4xl defaultGradient text-white text-center">
            <h3 className="font-semibold mb-2">Invite a Clinic</h3>
            <p className="text-sm opacity-90 mb-3 text-gray-100">
                Earn $100 in Credit. Discover qualified PTs while you earn platform credit.
            </p>
            <CustomButton size='lg' variant='normal'>
                See Detail
            </CustomButton>
        </div>
    )
}

export default InviteClinic