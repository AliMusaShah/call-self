import React from 'react'
import ReusableTable from '../../../components/ReusableTable'
import CustomButton from '../../../components/CustomButton'

const MoldMapping = () => {
    const cities = [
        { id: 1, name: 'Dhaid', mold: 324, color: 'bg-red-500' },
        { id: 2, name: 'Al Barari', mold: 188, color: 'bg-red-400' },
        { id: 3, name: 'Khor Fakkan', mold: 188, color: 'bg-red-400' },
        { id: 4, name: 'Abu Dhabi', mold: 173, color: 'bg-red-400' },
        { id: 5, name: 'Sharjah', mold: 170, color: 'bg-red-400' },
        { id: 6, name: 'Ajman', mold: 161, color: 'bg-red-400' },
        { id: 7, name: 'Hatta', mold: 159, color: 'bg-red-400' },
        { id: 8, name: 'Kalba', mold: 153, color: 'bg-red-400' },
        { id: 9, name: 'Liwa Oasis', mold: 145, color: 'bg-orange-300' },
        { id: 10, name: 'Jumeirah', mold: 143, color: 'bg-orange-300' }
    ]
    return (

        <div className=" bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 flex-1">
            <div className="p-4">
                <div className="flex flex-col gap-3 mb-2 ">
                    <h3 className="text-blue-500 text-sm font-medium">Mold Mapping</h3>
                    <h2 className="text-gray-800 text-lg ">Dubai Major City Mold Mapping</h2>
                </div>

                <div className="mt-4">
                    <div className="grid grid-cols-12 text-sm  pb-2 mb-2">
                        <div className="col-span-1 font-medium text-gray-500">#</div>
                        <div className="col-span-7 font-medium text-gray-500">CITY</div>
                        <div className="col-span-4 font-medium text-gray-500 text-right">MOLD</div>
                    </div>

                    <div className="space-y-3 overflow-y-auto">
                        {cities.map((city) => (
                            <div key={city.id} className="grid grid-cols-12 items-center text-sm">
                                <div className="col-span-1 text-gray-500">{city.id}</div>
                                <div className="col-span-7 text-gray-800">{city.name}</div>
                                <div className="col-span-4 flex justify-end">
                                    <div className={`${city.color} text-white text-center rounded-md px-3 py-1 w-16`}>
                                        {city.mold}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <CustomButton size='lg'>
                        SEE DUBAI AQI RANKING
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default MoldMapping