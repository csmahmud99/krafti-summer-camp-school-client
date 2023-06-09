// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Slider.css";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper";

import homeSliderBg from "../../../assets/home-slider-bg.jpg";

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
                className="mySwiper"
            >
                <div
                    slot="container-start"
                    className="parallax-bg"
                    style={{
                        "background-image":
                            `url(${homeSliderBg})`,
                    }}
                    data-swiper-parallax="-23%"
                ></div>

                <SwiperSlide className="bg-gradient-to-b from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className="title" data-swiper-parallax="-300">
                        Unleash Your Creativity
                    </div>
                    <div className="subtitle" data-swiper-parallax="-200">
                        Explore the World of Art & Craft
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                            Discover the joy of artistic expression as you delve into a diverse range of art and craft techniques. Let your imagination soar and unlock your creative potential through our engaging courses taught by experienced instructors.
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="bg-gradient-to-b from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className="title" data-swiper-parallax="-300">
                        Transform Ordinary Materials
                    </div>
                    <div className="subtitle" data-swiper-parallax="-200">
                        Learn the Art of Upcycling
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                            Turn discarded treasures into stunning works of art! Join our upcycling courses and learn how to repurpose everyday items into unique and environmentally-friendly creations. Explore the beauty of sustainability while unleashing your artistic ingenuity.
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="bg-gradient-to-b from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className="title" data-swiper-parallax="-300">
                        Master Artistic Techniques
                    </div>
                    <div className="subtitle" data-swiper-parallax="-200">
                        Develop Your Artistic Skills
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                            Whether you're a beginner or an experienced artist, our courses are designed to help you enhance your artistic skills. From drawing and painting to sculpture and digital art, our expert instructors will guide you on a creative journey of self-discovery and growth.
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;