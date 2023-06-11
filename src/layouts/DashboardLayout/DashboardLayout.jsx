import { FaChalkboard, FaChalkboardTeacher, FaClipboardList, FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <>
            <div className="drawer drawer-mobile lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Dashboard Menu</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-primary text-base-content">
                        {/* Sidebar content here */}
                        <li><NavLink to="/dashboard/admin"><FaHome />Admin Home</NavLink></li>
                        <li><NavLink to="/dashboard/manage-classes"><FaChalkboard />Manage Classes</NavLink></li>
                        <li><NavLink to="/dashboard/all-users"><FaUsers />All Users</NavLink></li>

                        <div className="divider"></div>

                        <li><NavLink to="/"><FaHome />Home</NavLink></li>
                        <li><NavLink to="/all-instructors"><FaChalkboardTeacher />All Instructors</NavLink></li>
                        <li><NavLink to="/all-classes"><FaClipboardList />All Classes</NavLink></li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default DashboardLayout;