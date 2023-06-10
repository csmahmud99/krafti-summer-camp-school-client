import { Link } from "react-router-dom";
import logo from "../../../../assets/logos/krafti-logo.png";

const NavigationBar = () => {
    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/all-instructors">All Instructors</Link></li>
        <li><Link to="/all-classes">All Classes</Link></li>
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
                    <img className="w-10 rounded-full" src="https://i.pravatar.cc/150?img=3" />
                    <button className="btn">Log Out</button>
                    <Link to="/login">
                        <button className="btn">Log In</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavigationBar;