'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    return (
        <div className="w-[184px] h-[50px] relative  ">
            <div
                className="flex items-center justify-evenly cursor-pointer"
                onClick={toggleDropdown}
            >
                {/* <img
                    src={ProfileAvatar}
                    alt="Profile Picture"
                    className="w-[40px] h-[40px] rounded-[8px]"
                /> */}
                <div className="">
                    <div className=" text-[16px] font-semibold capitalize">
                        Ali Musa
                    </div>
                    <div className=" text-[16px]  ">
                        User
                    </div>
                </div>

                {isOpen ? (<MdKeyboardArrowUp color="" size={24} />) : (<MdKeyboardArrowDown color="" size={24} />)}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <Link
                            href="#"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            {/* <img src={HelpIcon} alt="" className="mr-2" /> */}
                            Help

                        </Link>
                        <Link
                            href="/settings/updateprofile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            {/* <img src={SettingIcon} alt="" className="mr-2" /> */}
                            Settings

                        </Link>
                        <div
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            role="menuitem"
                        // onClick={handleLogOut}
                        >
                            {/* <img src={LogoutIcon} alt="" className="mr-2" /> */}
                            Logout

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown