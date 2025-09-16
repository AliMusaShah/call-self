import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import HelpIcon from '../../assets/userTag.png';
import SettingIcon from '../../assets/setting.png';
import LogoutIcon from '../../assets/logout.png';
import ProfileAvatar from "../../assets/profileAvatar.png";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import useLogout from "../../utils/useLogout";

function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // 🔹 Ref for whole dropdown
    const { user } = useSelector((state) => state.auth);
    const handleLogOut = useLogout();

    const toggleDropdown = () => setIsOpen(!isOpen);

    // 🔹 Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="w-[184px] h-[50px] relative">
            {/* Profile button */}
            <div
                className="flex items-center justify-evenly cursor-pointer"
                onClick={toggleDropdown}
            >
                <img
                    src={user?.data?.user?.image || ProfileAvatar}
                    alt="Profile"
                    className="w-[40px] h-[40px] rounded-[8px]"
                />
                <div>
                    <div className="text-[16px] font-semibold">
                        {user?.data?.user?.fullName}
                    </div>
                    <div className="text-[16px]">{user?.data?.user?.role}</div>
                </div>
                {isOpen ? (
                    <MdKeyboardArrowUp size={24} />
                ) : (
                    <MdKeyboardArrowDown size={24} />
                )}
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu">
                        <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <img src={HelpIcon} alt="" className="mr-2" />
                            Profile
                        </Link>
                        <Link
                            to="/updatepassword"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <img src={SettingIcon} alt="" className="mr-2" />
                            Update Password
                        </Link>
                        <div
                            onClick={handleLogOut}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                            <img src={LogoutIcon} alt="" className="mr-2" />
                            Logout
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
