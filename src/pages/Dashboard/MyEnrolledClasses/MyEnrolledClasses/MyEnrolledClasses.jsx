import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyEnrolledClasses = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: enroll = [], refetch } = useQuery(['enroll'], async () => {
        const res = await axiosSecure.get(`/enrolledStudent/${user?.email}`)
        return res.data;
    });

    // console.log(enroll);

    return (
        <>
            <div>
                <Helmet>
                    <title>My Enrolled Classes - Student | Krafti - Summer Camp Learning School</title>
                </Helmet>

                <section>
                    <SectionTitle
                        subHeading="Time to a New Journey to Learn a New Skill"
                        heading="My Enrolled Classes"
                    />

                    <div className="grid md:grid-cols-2 gap-5 ml-10 mr-10 bg-slate-200 py-16 mt-12 px-8">
                        {
                            enroll.map(myEnroll => <div key={myEnroll._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img src={myEnroll?.image} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <p><strong>Price:</strong> ${myEnroll?.price}</p>

                                    <h2 className="card-title text-primary font-bold">{myEnroll?.nameClass}</h2>

                                    <p><strong>Instructor's Name:</strong> {myEnroll?.instructorName}</p>
                                    <div className="card-actions mt-5">
                                        <button className="btn btn-primary">Start Class</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </section>
            </div>
        </>
    );
};

export default MyEnrolledClasses;