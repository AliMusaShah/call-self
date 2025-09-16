import React from 'react'
import { CiMapPin } from 'react-icons/ci'

const MapComponent = () => {
    return (
        <div className="relative bg-gray-100 rounded-lg overflow-hidden h-48">
            {/* Mock Map with Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-gray-300"></div>
                    ))}
                </div>
            </div>

            {/* Street-like lines */}
            <div className="absolute top-8 left-4 right-4 h-0.5 bg-gray-300 rotate-12"></div>
            <div className="absolute top-16 left-0 right-8 h-0.5 bg-gray-300 -rotate-6"></div>
            <div className="absolute top-24 left-8 right-0 h-0.5 bg-gray-300 rotate-3"></div>
            <div className="absolute left-12 top-0 bottom-4 w-0.5 bg-gray-300 rotate-12"></div>
            <div className="absolute left-20 top-8 bottom-0 w-0.5 bg-gray-300 -rotate-6"></div>

            {/* Location Labels */}
            <div className="absolute top-3 left-4 text-xs text-blue-600 bg-white px-1 rounded">
                Union Station
            </div>
            <div className="absolute top-12 right-8 text-xs text-blue-600 bg-white px-1 rounded">
                Union Station
            </div>
            <div className="absolute top-20 right-4 text-xs text-blue-600 bg-white px-1 rounded">
                Scotiabank Arena
            </div>
            <div className="absolute bottom-16 left-6 text-xs text-gray-600 bg-white px-1 rounded">
                Rogers Centre
            </div>
            <div className="absolute bottom-8 right-12 text-xs text-pink-500 bg-white px-1 rounded">
                Delta Hotels by Marriott Toronto
            </div>
            <div className="absolute bottom-4 right-4 text-xs text-pink-500 bg-white px-1 rounded">
                The Westin Harbour Castle, Toronto
            </div>

            {/* Green areas */}
            <div className="absolute top-6 left-16 w-8 h-6 bg-green-200 rounded opacity-60"></div>
            <div className="absolute bottom-12 left-24 w-6 h-8 bg-green-200 rounded opacity-60"></div>
            <div className="absolute bottom-6 right-16 w-10 h-6 bg-green-200 rounded opacity-60 text-xs text-center pt-1">
                <span className="text-green-700">Harbour</span>
            </div>

            {/* Central Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-500 w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <CiMapPin className="w-3 h-3 text-white fill-white" />
                </div>
            </div>

            {/* Entertainment District Label */}
            <div className="absolute top-1/3 left-8 text-xs text-gray-500 font-medium">
                <div>ENTERTAINMENT</div>
                <div>DISTRICT</div>
            </div>

            {/* Fashion District Label */}
            <div className="absolute top-1/4 left-4 text-xs text-gray-500 font-medium">
                <div>FASHION</div>
                <div>DISTRICT</div>
            </div>
        </div>
    )
}

export default MapComponent