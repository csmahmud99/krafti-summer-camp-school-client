// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Slider.css";

// import Swiper required modules
import { Parallax, Pagination, Navigation } from "swiper";

import SliderContent from "../SliderContent/SliderContent";
import ButtonSmall from "../../../../components/ButtonSmall/ButtonSmall";

const Slider = () => {

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                speed={600}
                parallax={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Parallax, Pagination, Navigation]}
                className="mySwiper bg-slide"
            >
                <div
                    slot="container-start"
                    className="parallax-bg bg-slide"
                    style={{
                        backgroundImage:
                            "url(https://i.ibb.co/6gY10H3/home-slider-bg.jpg)",
                    }}
                    data-swiper-parallax="-23%"
                ></div>

                <SwiperSlide>
                    <SliderContent
                        title="Unleash Your Creativity"
                        subTitle="Explore the World of Art & Craft"
                        content="Join our engaging courses taught by experienced instructors to discover the joy of artistic expression. From drawing and painting to sculpture and digital art, we provide a nurturing environment for you to let your imagination soar and unlock your creative potential."
                    />
                    <ButtonSmall buttonText="Know More" buttonURL="#" />
                </SwiperSlide>

                <SwiperSlide>
                    <SliderContent
                        title="Transform Ordinary Materials"
                        subTitle="Learn the Art of Upcycling"
                        content="Dive into the art of upcycling and learn how to transform ordinary materials into extraordinary creations. Our upcycling courses offer innovative techniques and ideas for repurposing everyday items, allowing you to make stunning works of art while embracing sustainability."
                    />
                    <ButtonSmall buttonText="Know More" buttonURL="#" />
                </SwiperSlide>

                <SwiperSlide>
                    <SliderContent
                        title="Master Artistic Techniques"
                        subTitle="Develop Your Artistic Skills"
                        content="Whether you're a beginner or an experienced artist, our courses are designed to help you enhance your artistic skills. From drawing and painting to sculpture and digital art, our expert instructors will guide you on a creative journey of self-discovery and growth."
                    />
                    <ButtonSmall buttonText="Know More" buttonURL="#" />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;