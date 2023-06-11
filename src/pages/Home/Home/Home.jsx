import HomeAbout from "../HomeAbout/HomeAbout";
import Slider from "../Slider/Slider/Slider";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Krafti - Summer Camp Learning School</title>
            </Helmet>
            {/* This Slider is created with "React Responsive Carousel" */}
            <Slider />

            {/* "AOS Package" is used for creating animation in this component */}
            <HomeAbout />
        </>
    );
};

export default Home;