import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";

const SelectDropdown = ({ value, onChange, options }) => {
    return (
        <div className="relative">
            <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={onChange}
            >

                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <RiArrowDropDownLine size={20} />
            </div>
        </div>
    )
}

export default SelectDropdown