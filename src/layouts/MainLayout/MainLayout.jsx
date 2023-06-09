import { Outlet } from "react-router-dom";
import Footer from "../../pages/shared/Footer/Footer";
import NavigationBar from "../../pages/shared/Header/NavigationBar/NavigationBar";

const MainLayout = () => {
    return (
        <div>
            <NavigationBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;