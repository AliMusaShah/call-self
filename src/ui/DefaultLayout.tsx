import Navbar from "@/components/navbar"
import SideBar from "@/components/SideBar"
import { DefaultLayoutProps } from "@/types"

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div >
            <div className="flex h-screen ">
                {/* Sidebar on the left */}
                <SideBar />

                <div className=" px-6 flex flex-1 flex-col ">
                    <Navbar />

                    <div className="relative flex-1  p-2 bg-[#f4f5fa] ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout