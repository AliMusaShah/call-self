import { MdOutlineDashboard, MdOutlineReceiptLong, MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/sideBarLogo.png';
import { useSelector } from "react-redux";
function SideBar() {
    const { user: loginResponse } = useSelector((state) => state.auth);
    const { data } = loginResponse
    const { user } = data

    const inspectorMenuItems = [
        { id: 1, to: "/inspector-dashboard", url: "inspector-dashboard", label: "Dashboard", icon: <MdOutlineDashboard /> },
        { id: 2, to: "/inspector-tasks", url: "inspector-tasks", label: "Tasks", icon: <MdOutlineShoppingCart /> },
        { id: 3, to: "/inspector-reports", url: "inspector-reports", label: "Reports", icon: <MdOutlineReceiptLong /> }
    ]
    const adminMenuItems = [
        { id: 1, to: "/admin-dashboard", url: "admin-dashboard", label: "Dashboard", icon: <MdOutlineDashboard /> },
        { id: 2, to: "/customers", url: "customers", label: "Customers", icon: <MdOutlineShoppingCart /> },
        { id: 3, to: "/tasks", url: "task", label: "Manage Tasks", icon: <MdOutlineShoppingCart /> },
        { id: 4, to: "/market-place", url: "market-place", label: "Manage Marketplace", icon: <MdOutlineReceiptLong /> },
        { id: 5, to: "/certificates", url: "certificates", label: "Manage Certificates", icon: <MdOutlineDashboard /> },
        { id: 6, to: "/orders", url: "orders", label: "Manage Orders", icon: <MdOutlineShoppingCart /> },
        { id: 7, to: "/forms", url: "forms", label: "Manage Forms", icon: <MdOutlineReceiptLong /> },
        { id: 8, to: "/user-management", url: "user-management", label: "User Management", icon: <MdOutlineShoppingCart /> },
        { id: 9, to: "/reports", url: "reports", label: "Reports", icon: <MdOutlineReceiptLong /> }
    ]
    const ownerMenuItems = [
        { id: 1, to: "/owner-dashboard", url: "owner-dashboard", label: "Dashboard", icon: <MdOutlineDashboard /> },
        { id: 2, to: "/owner-certificates", url: "owner-certificates", label: "Manage Certificates", icon: <MdOutlineDashboard /> },
        { id: 3, to: "/Customers", url: "Customers", label: "Orders", icon: <MdOutlineShoppingCart /> },
        { id: 4, to: "/owner-reports", url: "owner-reports", label: "Reports", icon: <MdOutlineReceiptLong /> }

    ]
    const role = user?.role
    // const menuItems = role === "inspector" ? inspectorMenuItems : role === "admin" ? adminMenuItems : role === "customer" ? ownerMenuItems : null;
    const getMenuItems = (role) => {
        switch (role) {
            case "inspector":
                return inspectorMenuItems;
            case "admin":
                return adminMenuItems;
            case "customer":
                return ownerMenuItems;
            default:
                return null;
        }
    };
    const menuItems = getMenuItems(role);
    const { pathname } = useLocation();
    return (
        <div className='h-full bg-[#171616] p-6 md:w-72 shadow-md rounded-lg overflow-y-auto'>
            <div className="flex items-center justify-start mb-8">
                <img src={Logo} alt="Company Logo" className="h-12 w-auto" />
            </div>
            <div>
                {menuItems.map((item) => {
                    const isActive = pathname.includes(item.url);

                    return (
                        <Link key={item.id} to={item.to}>
                            <div
                                className={`relative min-h-[50px] my-4 flex items-center rounded-lg px-3 py-2 cursor-pointer text-white hover:bg-[var(--defaultBlue)] ${isActive
                                    ? "bg-[var(--defaultBlue)]"
                                    : " bg-transparent"
                                    }`}
                            >
                                {/* Icon */}
                                <div className="mr-3 text-2xl">
                                    {item.icon}
                                </div>
                                {/* Label */}
                                <span className="font-normal">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}


export default SideBar;
