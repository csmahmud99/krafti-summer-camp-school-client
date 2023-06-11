import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Home from "../../pages/Home/Home/Home";
import AllInstructors from "../../pages/AllInstructors/AllInstructors";
import AllClasses from "../../pages/AllClasses/AllClasses";
import LogIn from "../../pages/LogIn/LogIn/LogIn";
import Register from "../../pages/LogIn/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../../layouts/DashBoardLayout/DashboardLayout";
import AllUsers from "../../pages/Dashboard/AllUsers/AllUsers";

const router = createBrowserRouter([
    // Main/Basic Page Layout Routes
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/all-instructors",
                element: <AllInstructors />
            },
            {
                path: "/all-classes",
                element: <AllClasses />
            },
            {
                path: "/login",
                element: <LogIn />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },

    // Dashboard Pages Layout Routes
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "all-users",
                element: <AllUsers />
            }
        ]
    }
]);

export default router;