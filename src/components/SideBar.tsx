// import { Link, useLocation } from "react-router-dom";
'use client'
import ApplicationsIcon from '@/assets/icons/applicantsIcon.svg';
import CalenderIcon from '@/assets/icons/calenderIcon.svg';
import DashboardIcon from '@/assets/icons/dashboardIcon.svg';
import FlagIcon from '@/assets/icons/flagIcon.svg';
import HistoryIcon from '@/assets/icons/historyIcon.svg';
import LogoutIcon from '@/assets/icons/logoutIcon.svg';
import MessagesIcon from '@/assets/icons/messagesIcon.svg';
import PaymentsIcon from '@/assets/icons/paymentsIcon.svg';
import SettingIcon from '@/assets/icons/settingIcon.svg';
import ShiftIcon from '@/assets/icons/shiftsIcon.svg';
import StarIcon from '@/assets/icons/starIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



import Logo from '@/assets/images/logo.png';
import InviteClinic from './InviteClinic';



const PTMenuItems = [
    {
        section: "MAIN",
        items: [
            { id: 1, to: "/pt-dashboard", url: "pt-dashboard", label: "Dashboard", icon: DashboardIcon },
            { id: 2, to: "/calendar", url: "calendar", label: "My Calendar", icon: CalenderIcon },
            { id: 3, to: "/shifts", url: "shifts", label: "Shifts", icon: ShiftIcon },
            { id: 4, to: "/applications", url: "applications", label: "My Applications", icon: ApplicationsIcon },
            { id: 5, to: "/messages", url: "messages", label: "Messages", icon: MessagesIcon },
            { id: 6, to: "/earnings", url: "earnings", label: "Earnings", icon: PaymentsIcon },
            { id: 7, to: "/ratings-strikes", url: "ratings-strikes", label: "My Ratings & Strikes", icon: StarIcon },
            { id: 8, to: "/history", url: "history", label: "History", icon: HistoryIcon },
            { id: 9, to: "/dispute-center", url: "dispute-center", label: "Dispute Center", icon: FlagIcon },
        ]
    },
    {
        section: "SETTINGS",
        items: [
            { id: 10, to: "/settings", url: "settings", label: "Profile Settings", icon: SettingIcon },
            { id: 11, to: "/logout", url: "logout", label: "Logout", icon: LogoutIcon },
        ]
    }
];
// const settingsItems = [
//     { id: 2, to: "/calendar", url: " calendar", label: "My Calendar", icon: CalenderIcon },]


const SideBar = () => {
    const pathname = usePathname()
    const role: string = "user";
    const menuItems = role === "pt" ? PTMenuItems : PTMenuItems;
    return (
        <div className='h-full  p-2 md:w-72 shadow-md rounded-lg overflow-y-auto bg-white'>
            <div className="flex items-center justify-start mb-4">
                <Image
                    src={Logo}
                    width={250}
                    height={500}
                    alt="Picture of the Logo"
                />
            </div>
            <div>
                {menuItems.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-2">
                        {/* Section Header */}
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                            {section.section}
                        </div>

                        {/* Section Items */}
                        {section.items.map((item) => {
                            const isActive = pathname.includes(item.url);
                            return (
                                <Link key={item.id} href={item.to}>
                                    <div
                                        className={`group relative min-h-[50px] my-1 flex items-center rounded-lg px-3  cursor-pointer defaultGradientHover hover:text-white  ${isActive
                                            ? "defaultGradient text-white"
                                            : " bg-transparent"
                                            }`}
                                    >
                                        <div className="mr-3">
                                            <Image
                                                src={item.icon}
                                                alt={`${item.label} icon`}
                                                className={` ${isActive
                                                    ? '[filter:invert(1)]'
                                                    : 'group-hover:[filter:invert(1)]'
                                                    }`}
                                            />
                                        </div>
                                        <span className="font-normal">{item.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ))}
                <InviteClinic />
            </div>
        </div>
    )
}

export default SideBar
