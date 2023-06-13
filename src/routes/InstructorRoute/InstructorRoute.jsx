import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../../hooks/useInstructor";

const InstructorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();

    // User wished to go to a protected page, he/she is redirected to the login page. After the successful log in, the user will go towards the page he/she wished for.
    const location = useLocation();

    // Solution :: User is logged in already, but when the user reload the private page again, then he/she is redirected to the login page again
    if (loading || isInstructorLoading) {
        return <progress className="progress w-56 mt-28 mb-16"></progress>
    }

    if (user && isInstructor) {
        return children;
    }

    // User wished to go to a protected page, he/she is redirected to the login page. After the successful log in, the user will go towards the page he/she wished for.
    return <Navigate to="/" state={{ from: location }} replace />
};

export default InstructorRoute;