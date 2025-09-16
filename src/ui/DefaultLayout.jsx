import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/navbar";
// import Navbar from "../custom/navbar";
// import SideBar from "../admin/SideBar";

const DefaultLayout = () => {
    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen">
                {/* Sidebar on the left */}
                <SideBar />

                <div className=" px-6 flex flex-1 flex-col ">
                    {/* Navbar on the top */}
                    <Navbar />

                    {/* Main Content */}
                    <div className="relative flex-1 overflow-y-auto overflow-x-hidden p-4">
                        <main className="bg-[var(--defaultBgColor)] p-3">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
