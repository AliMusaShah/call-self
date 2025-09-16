import { Link, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-400">404</h1>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <div className="space-x-4">

                    <div
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition duration-300 cursor-pointer"
                    >
                        Go Back
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;