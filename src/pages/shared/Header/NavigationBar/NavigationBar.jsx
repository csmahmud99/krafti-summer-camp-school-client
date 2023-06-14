import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logos/krafti-logo.png";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAdmin from "../../../../hooks/useAdmin";

// Importing 'user' and 'system logout' provider from AuthContext API
import { AuthContext } from "../../../../providers/AuthProvider/AuthProvider";
import useInstructor from "../../../../hooks/useInstructor";

const NavigationBar = () => {
    const navigate = useNavigate();

    // 'user' & 'system logOut' provider from AuthContext API
    const { user, logOut, loading } = useContext(AuthContext);
    // console.log(user);

    // const isAdmin = true;
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor, isInstructorLoading] = useInstructor();
    // console.log(isInstructor);

    // Dark/Light Mode Toggler
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    const handleToggle = event => {
        if (event.target.checked) {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    // Handle LogOut
    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("LogOut Successful");
                Swal.fire({
                    title: 'User is successfully logged out.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate("/login");
            })
            .catch(error => {
                console.log("error logout", error.message);
            });
    };

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/all-instructors">All Instructors</Link></li>
        <li><Link to="/all-classes">All Classes</Link></li>

        {
            user
                ? <>
                    {
                        isAdmin
                            ? <Link to="/dashboard/all-users" className="btn btn-outline btn-sm bg-black text-yellow-400 ">Admin Dashboard</Link>
                            : isInstructor
                                ? <Link to="/dashboard/my-classes" className="btn btn-outline btn-sm bg-black text-yellow-400 ">Instructor Dashboard</Link>
                                : <Link to="/dashboard/my-selected-classes" className="btn btn-outline btn-sm bg-black text-yellow-400 ">Student Dashboard</Link>
                    }
                </>
                : <></>
        }
    </>

    // Off the tiny-time other dashboard button load after logging-in
    if (loading || isAdminLoading || isInstructorLoading) {
        <progress className="progress w-56"></progress>
    }
    return (
        <>
            <div className="navbar fixed z-10 bg-primary text-neutral-content px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/">
                        <img src={logo} alt="site-logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className=" flex navbar-end gap-3">
                    {
                        user
                            ? <>
                                <img title={user?.displayName} className="w-10 rounded-full" src={user?.photoURL} alt="user-profile-image" />
                                <button onClick={handleLogOut} className="btn">Log Out</button>
                            </>
                            : <>
                                <Link to="/login">
                                    <button className="btn">Log In</button>
                                </Link>
                            </>
                    }
                </div>
                <div className="ml-1">
                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            checked={theme === "light" ? false : true}
                        />

                        {/* sun icon */}
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        {/* moon icon */}
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>
                </div>
            </div>
        </>
    );
};

export default NavigationBar;