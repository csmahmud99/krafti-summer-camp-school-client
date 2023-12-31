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
import ManageClasses from "../../pages/Dashboard/ManageClasses/ManageClasses/ManageClasses";
import MySelectedClasses from "../../pages/Dashboard/MySelectedClasses/MySelectedClasses/MySelectedClasses";
import MyEnrolledClasses from "../../pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses/MyEnrolledClasses";
import AdminRoute from "../AdminRoute/AdminRoute";
import MyClasses from "../../pages/Dashboard/MyClasses/MyClasses/MyClasses";
import AddClass from "../../pages/Dashboard/AddClass/AddClass/AddClass";
import InstructorRoute from "../InstructorRoute/InstructorRoute";
import UpdateClass from "../../pages/Dashboard/MyClasses/MyClasses/UpdateClass/UpdateClass";
import Payment from "../../pages/Dashboard/PaymentService/Payment/Payment";
import PaymentHistory from "../../pages/Dashboard/PaymentHistory/PaymentHistory";

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
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: "manage-classes",
                element: <AdminRoute><ManageClasses /></AdminRoute>
            },
            {
                path: "my-classes",
                element: <InstructorRoute><MyClasses /></InstructorRoute>
            },
            {
                path: "add-class",
                element: <InstructorRoute><AddClass /></InstructorRoute>
            },
            {
                path: "update-class/:id",
                element: <InstructorRoute><UpdateClass /></InstructorRoute>
            },
            {
                path: "my-selected-classes",
                element: <MySelectedClasses />
            },
            {
                path: "my-enrolled-classes",
                element: <MyEnrolledClasses />
            },
            {
                path: "my-payment-history",
                element: <PaymentHistory />
            },
            {
                path: "payment/:id",
                element: <Payment />
            }
        ]
    }
]);

export default router;