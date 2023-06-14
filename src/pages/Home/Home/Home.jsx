import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import HomeAbout from "../HomeAbout/HomeAbout";
import PopularInstructor from "../PopularInstructors/PopularInstructors";
import Slider from "../Slider/Slider/Slider";
import { Helmet } from 'react-helmet-async';
import SectionTitle from "../../../components/sectionTitle/sectionTitle";

const Home = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: popularClasses = [] } = useQuery(['popularClasses'], async () => {
        const res = await axiosSecure.get('/popularClasses')
        return res.data;
    });

    console.log(popularClasses);

    return (
        <>
            <Helmet>
                <title>Home | Krafti - Summer Camp Learning School</title>
            </Helmet>
            {/* This Slider is created with "React Responsive Carousel" */}
            <Slider />

            {/* "AOS Package" is used for creating animation in this component */}
            <HomeAbout />

            <div>
                <section className="mt-5">
                    <SectionTitle
                        subHeading="Our Most Demandable"
                        heading="Popular Classes"
                    />

                    <div className="grid md:grid-cols-3 gap-5 pb-20 px-8 rounded-md">
                        {
                            popularClasses.map(popularClass => <div key={popularClasses._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img src={popularClass?.image} alt="class-banner" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <p><strong>Price:</strong> ${popularClass?.price}</p>
                                    <h2 className="card-title text-primary font-bold">{popularClass?.nameClass}</h2>

                                    <p><strong>Instructor's Name:</strong> {popularClass?.instructorName}</p>

                                    <p><strong>Enrolled:</strong> {popularClass?.enroll}</p>

                                    <p><strong>Available Seats:</strong> {popularClass?.seats}</p>
                                </div>
                            </div>)
                        }
                    </div>
                </section>
            </div>
            <hr /> <hr />
            {/* Popular Instructor, sorting was optional, not done through, will be implemented in future */}
            <PopularInstructor />
        </>
    );
};

export default Home;