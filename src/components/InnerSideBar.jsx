import { MdOutlineDashboard, MdOutlineReceiptLong, MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
// import Logo from '../assets/sideBarLogo.png';
function InnerSideBar() {


    const settingsItems = [
        { id: 1, to: "/settings/organization-setting", url: "settings/organization-setting", label: "Organization Setting" },
        { id: 2, to: "/settings/server-url", url: "settings/server-url", label: "Server URL" },
        { id: 3, to: "/settings/delete-organization", url: "settings/delete-organization", label: "Delete Organization" },
        { id: 4, to: "/settings/members", url: "settings/members", label: "Members" },
        { id: 5, to: "/settings/billing-addon", url: "settings/billing-addon", label: "Billing & Add-Ons" },
    ]

    const role = 'setting'
    const menuItems = role === "setting" ? settingsItems : '';
    const { pathname } = useLocation();

    return (
        <div className='h-full  p-6 md:w-72 shadow-md rounded-lg overflow-y-auto'>
            <div className="flex items-center justify-start mb-8">
                {/* <img src={Logo} alt="Company Logo" className="h-12 w-auto" /> */}
            </div>
            <div>
                {menuItems.map((item) => {
                    const isActive = pathname.includes(item.url);

                    return (
                        <Link key={item.id} to={item.to}>
                            <div
                                className={`relative min-h-[50px] my-4 flex items-center rounded-lg px-3 py-2 cursor-pointer hover:text-white hover:bg-[var(--defaultPurple)] ${isActive
                                    ? "bg-[var(--defaultPurple)] text-white"
                                    : " bg-transparent"
                                    }`}
                            >

                                <span className="font-normal">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}


export default InnerSideBar;
