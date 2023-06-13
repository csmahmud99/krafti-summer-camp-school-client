import { FaBookmark, FaChalkboard, FaChalkboardTeacher, FaClipboardCheck, FaClipboardList, FaFolderPlus, FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const DashboardLayout = () => {
    // TODO :: Load data from the server to have dynamic isAdmin based on data
    // const isAdmin = true;
    const [isAdmin] = useAdmin();

    return (
        <>
            <div className="drawer drawer-mobile lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mt-5">Open Dashboard Menu</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-primary text-base-content text-xl">
                        {/* Sidebar content here */}

                        {
                            isAdmin
                                ? <>
                                    <li><NavLink to="/dashboard/all-users"><FaUsers />Manage Users</NavLink></li>

                                    <li><NavLink to="/dashboard/manage-classes"><FaChalkboard />Manage Classes</NavLink></li>
                                </>
                               /*  : isInstructor
                                    ? <>
                                        <li><NavLink to="/dashboard/add-class"><FaFolderPlus />Add a Class</NavLink></li>

                                        <li><NavLink to="/dashboard/my-classes"><FaClipboardList />My Classes</NavLink></li>
                                    </> */
                                    : <>
                                        <li><NavLink to="/dashboard/my-selected-classes"><FaBookmark />My Selected Classes</NavLink></li>

                                        <li><NavLink to="/dashboard/my-enrolled-classes"><FaClipboardCheck />My Enrolled Classes</NavLink></li>
                                    </>
                        }

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