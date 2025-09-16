import GoogleIcon from '../assets/icons/googleIcon.svg';
const GoogleButton = () => {
    return (
        // <div className="w-full cursor-pointer">
        <div className="flex items-center justify-center w-full px-4 py-3 bg-white border border-[#465FF166] cursor-pointer rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            {/* Google Logo - positioned as shown in image */}
            <div className="flex-shrink-0 mr-4">

                <img src={GoogleIcon} alt="Google Icon" className="w-5 h-5" />
            </div>

        </div>
        // </div>
    )
}

export default GoogleButton