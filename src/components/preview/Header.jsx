import React from 'react'
import { CiCalendar } from 'react-icons/ci'

const Header = ({
    title = "Calendar Preview",
    subtitle = "Your availability and scheduled shifts",
}) => {
    return (
        <div className="">
            <div className="flex items-center gap-2 mb-2">
                <CiCalendar className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    )
}

export default Header