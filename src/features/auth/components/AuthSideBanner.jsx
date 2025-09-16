
const AuthSideBanner = () => {
    return (
        <div className="flex flex-col justify-between  min-h-screen  bg-gray-100 bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold mb-4 leading-tight">Welcome to On Callie</h1>
                <p className="text-lg opacity-90 leading-relaxed">Empowering PTs & PTAs with Flexible Work Opportunities</p>
            </div>

            {/* Bottom Section */}
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Your Next Shift</h2>
                <p className="text-base opacity-90 leading-relaxed">
                    Built for Physical Therapists & PTAs to find flexible, high-paying clinical shifts with ease.
                </p>
            </div>
        </div>
    )
}

export default AuthSideBanner