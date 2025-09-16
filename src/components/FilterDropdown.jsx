import React from 'react'
import { LiaFilterSolid } from "react-icons/lia";
import { RiArrowDropDownLine } from 'react-icons/ri';

const FilterDropdown = ({ value, onChange, options }) => {
    return (
        <div className="relative border-gray-300 rounded-md py-1 pl-3 pr-8 w-[200px] ">
            <div className="">
                <LiaFilterSolid size={20} color='gray' className=' absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5' />
            </div>
            <select
                className="text-gray-700  rounded-md bg-[#F2F4F4] shadow-sm placeholder:mx-1 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full pl-8 pr-4 py-2"
                value={value || ''}
                onChange={onChange}
            >

                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <RiArrowDropDownLine size={20} />
            </div> */}

        </div>
    )
}

export default FilterDropdown