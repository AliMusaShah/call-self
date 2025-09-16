import React from 'react'

const ErrorElement = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md w-full text-center">
                <div className="text-6xl mb-4">😵</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Dang!</h1>
                <p className="text-gray-600 mb-6">Something went wrong</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}

export default ErrorElement