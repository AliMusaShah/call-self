import Favourite from "./Favourite"
import Notification from "./Notification"
import ProfileDropdown from "./ProfileDropdown"

const Navbar = () => {
    return (
        <div className={`flex justify-between py-3 bg-white border-b border-[#E4E4E7] `}>
            <div className="">
                <div className="mb-2">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back, {'Metro Physical Therapy'} 👋</h1>
                    <p className=" text-gray-600">Manage your per diem PT staffing needs</p>
                </div>
            </div>
            <div className="flex gap-4">
                <Favourite />
                <Notification />
                <ProfileDropdown />

            </div>
        </div>
    )
}

export default Navbar