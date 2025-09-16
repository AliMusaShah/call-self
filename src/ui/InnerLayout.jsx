import { Outlet } from "react-router-dom";
import SideBar from '../components/SideBar'
import Navbar from "../components/navbar";
import InnerSideBar from "../components/InnerSideBar";
const InnerLayout = () => {
    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen">
                {/* Sidebar on the left */}
                <SideBar />

                <div className=" px-6 flex flex-1 flex-col ">
                    <Navbar />
                    <div className="flex h-screen">
                        {/* Sidebar on the left */}
                        <InnerSideBar />

                        <div className=" px-6 flex flex-1 flex-col ">

                            <main className="bg-[var(--defaultBgColor)] p-3">
                                <div>Settings</div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnerLayout;
