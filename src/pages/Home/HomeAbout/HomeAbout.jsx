import ButtonMedium from "../../../components/ButtonMedium/ButtonMedium";
import { useEffect } from "react";

// AOS Package Import 
import AOS from 'aos';
import 'aos/dist/aos.css';


const HomeAbout = () => {
    // AOS Package initialization 
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2">
                        <img src="https://i.ibb.co/9tKX6Wg/home-page-about-one.jpg" alt="home-about-one" className="w-fit border-8 border-purple-900 rounded-md" data-aos="zoom-in" />
                    </div>

                    <div className="w-1/2 space-y-5">
                        <p className="text-slate-400 font-bold text-xl" data-aos="fade-right">Welcome to</p>
                        <h1 className="text-5xl font-bold text-purple-800" data-aos="fade-left">Krafti</h1>
                        <br />
                        <span className="bg-purple-800 text-white p-2 rounded-md">Summer Camp Learning School</span>
                        <hr className="bg-slate-400 h-1" />
                        <p className="py-6" data-aos="fade-left">
                            Welcome to our <span className="font-bold text-purple-800">Krafti</span>. We are passionate about nurturing creativity and providing a platform for artistic exploration. Our mission is to inspire and empower students of all ages to unlock their artistic potential and discover the joy of self-expression. With our expert instructors, diverse range of courses, and supportive learning environment, we offer a dynamic and enriching experience for anyone looking to delve into the world of art and craft. Join us on this creative journey and let your imagination soar!
                        </p>
                        <ButtonMedium
                            buttonURL="#"
                            buttonText="More About Us"
                            data-aos="fade-out"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeAbout;