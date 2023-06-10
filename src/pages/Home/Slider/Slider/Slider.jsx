import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import sliderImage01 from "../../../../assets/home-slider-01.png";
import sliderImage02 from "../../../../assets/home-slider-02.jpg";
import sliderImage03 from "../../../../assets/home-slider-03.jpg";
import SliderContent from "../SliderContent/SliderContent";
import ButtonSmall from "../../../../components/ButtonSmall/ButtonSmall";

const Slider = () => {
    return (
        <>
            <Carousel>
                {/* Slider - 01 */}
                <div style={{height: "700px"}}>
                    <img src={sliderImage01} className="h-full w-auto" />
                    <p className="legend p-5">
                        <SliderContent
                            title="Unleash Your Creativity"
                            subTitle="Explore the World of Art & Craft"
                            content="Join our engaging courses taught by experienced instructors to discover the joy of artistic expression. From drawing and painting to sculpture and digital art, we provide a nurturing environment for you to let your imagination soar and unlock your creative potential."
                        />
                        <ButtonSmall buttonText="Know More" buttonURL="#" />
                    </p>
                </div>

                {/* Slider - 02 */}
                <div style={{height: "700px"}}>
                    <img src={sliderImage02} className="h-full w-auto" />
                    <p className="legend p-5">
                        <SliderContent
                            title="Transform Ordinary Materials"
                            subTitle="Learn the Art of Up-cycling"
                            content="Dive into the art of up-cycling and learn how to transform ordinary materials into extraordinary creations. Our up-cycling courses offer innovative techniques and ideas for repurposing everyday items, allowing you to make stunning works of art while embracing sustainability. Join us on a journey of discovering the beauty in giving new life to discarded treasures."
                        />
                        <ButtonSmall buttonText="Know More" buttonURL="#" />
                    </p>
                </div>

                {/* Slider - 03 */}
                <div style={{height: "700px"}}>
                    <img src={sliderImage03} className="h-full w-auto" />
                    <p className="legend p-5">
                        <SliderContent
                            title="Master Artistic Techniques"
                            subTitle="Develop Your Artistic Skills"
                            content="Develop your artistic skills and master a range of techniques through our comprehensive courses. Whether you're a beginner or an experienced artist, our expert instructors are dedicated to helping you grow and refine your abilities. From drawing and painting to sculpture and digital art, our classes provide a supportive environment where you can nurture your creativity and expand your artistic horizons."
                        />
                        <ButtonSmall buttonText="Know More" buttonURL="#" />
                    </p>
                </div>
            </Carousel>
        </>
    );
};

export default Slider;