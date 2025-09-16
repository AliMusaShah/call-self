

import Notification from './Notification';
import ProfileDropdown from './ProfileDropdown';
import Breadcrumb from './Breadcrumb';
function Navbar() {
    return (
        <>
            <div className={`flex justify-between p-5 bg-white border-b border-[#E4E4E7] `}>
                <Breadcrumb />
                <div className="flex gap-4">
                    <Notification />
                    <ProfileDropdown />

                </div>
            </div>

        </>
    );
}
export default Navbar;
