import React from 'react'
import SearchBar from '../components/SearchBar'
import { Months } from '../mock/data';
import FilterDropdown from '../components/FilterDropdown';

const Header = ({ value, onChange, children, placeholder }) => {
    return (
        <div className='flex justify-between items-center p-2 bg-white '>
            <SearchBar value={value} onChange={onChange} placeholder={placeholder} />

            <div className='flex items-center '>
                {/* <FilterDropdown value={timeFrame} options={Months} onChange={(e) => setTimeFrame(e.target.value)} /> */}
                {children}
            </div>
        </div>
    )
}

export default Header