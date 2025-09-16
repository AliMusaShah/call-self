import React from 'react';
import LogOutIcon from '../assets/sidebar/logOut.svg'
// import { useDispatch } from 'react-redux';
// import { logout } from '../features/auth/slices/authSlice';
import useLogout from '../hooks/useLogout';
const LogoutButton = () => {
    const handleLogOut = useLogout();
    return (
        <div className='h-1/4 flex flex-col justify-end'>
            <button
                onClick={handleLogOut}
                className={`flex space-x-4 bg-[#F3E7FF] cursor-pointer rounded-lg font-semibold px-6 py-3 my-3 text-lg w-full `}
            >
                <img src={LogOutIcon} alt="" />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default LogoutButton;