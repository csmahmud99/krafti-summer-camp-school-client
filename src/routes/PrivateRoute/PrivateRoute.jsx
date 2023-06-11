import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // User wished to go to a protected page, he/she is redirected to the login page. After the successful log in, the user will go towards the page he/she wished for.
    const location = useLocation();

    // Solution :: User is logged in already, but when the user reload the private page again, then he/she is redirected to the login page again
    if (loading) {
        return <progress className="progress w-56 mt-28 mb-16"></progress>
    }

    if (user) {
        return children;
    }

    // User wished to go to a protected page, he/she is redirected to the login page. After the successful log in, the user will go towards the page he/she wished for.
    return <Navigate to="/login" state={{ from: location }} replace />
};

export default PrivateRoute;