import HomeAbout from "../HomeAbout/HomeAbout";
import Slider from "../Slider/Slider/Slider";

const Home = () => {
    return (
        <div>
            {/* This Slider is created with "React Responsive Carousel" */}
            <Slider />

            {/* "AOS Package" is used for creating animation in this component */}
            <HomeAbout />
        </div>
    );
};

export default Home;