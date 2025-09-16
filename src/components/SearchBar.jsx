
import { CiSearch } from "react-icons/ci";
const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {

    return (
        <div className="w-1/4 ">
            <div className='relative w-full'>
                <CiSearch className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                <input
                    type="text"
                    name="query"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="border border-gray-300 rounded-md bg-white shadow-sm placeholder:mx-1 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full pl-8 pr-4 py-2"
                />
            </div>
        </div>
    )
}

export default SearchBar