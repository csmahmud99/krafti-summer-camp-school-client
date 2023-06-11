import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logos/krafti-logo.png";
import { useContext } from "react";
import Swal from "sweetalert2";

// Importing 'user' and 'system logout' provider from AuthContext API
import { AuthContext } from "../../../../providers/AuthProvider/AuthProvider";

const NavigationBar = () => {
    const navigate = useNavigate();

    // 'user' & 'system logOut' provider from AuthContext API
    const { user, logOut } = useContext(AuthContext);
    console.log(user);

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
        <li><Link to="/secret-page">Secret</Link></li>
    </>

    return (
        <>
            <div className="navbar fixed z-10 bg-primary text-neutral-content px-7">
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
            </div>
        </>
    );
};

export default NavigationBar;