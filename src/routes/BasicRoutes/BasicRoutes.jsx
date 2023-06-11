import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Home from "../../pages/Home/Home/Home";
import AllInstructors from "../../pages/AllInstructors/AllInstructors";
import AllClasses from "../../pages/AllClasses/AllClasses";
import LogIn from "../../pages/LogIn/LogIn/LogIn";
import Register from "../../pages/LogIn/Register/Register";
import Secret from "../../pages/Secret/Secret";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
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
            },
            {
                path: "/secret-page",
                element: <PrivateRoute><Secret /></PrivateRoute>
            }
        ]
    },
]);

export default router;