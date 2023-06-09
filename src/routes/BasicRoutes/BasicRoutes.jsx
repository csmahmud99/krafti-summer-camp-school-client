import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Home from "../../pages/Home/Home/Home";
import AllInstructors from "../../pages/AllInstructors/AllInstructors";
import AllClasses from "../../pages/AllClasses/AllClasses";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
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
            }
        ]
    },
]);

export default router;