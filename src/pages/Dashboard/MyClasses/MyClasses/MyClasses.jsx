import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    // Using 'TanStack Query/React Query' with 'Axios Interceptor' for getting all instructor's email-specific data to show it on the UI/client-side 
    const { data: myClasses } = useQuery(["myClasses"], async () => {
        const res = await axiosSecure.get(`/myClasses/${user?.email}`);
        return res.data;
    })

    // Navigating to update-page to update a single-class's data field
    const navigate = useNavigate();


    return (
        <>
            <div>
                <Helmet>
                    <title>My Class - Instructor | Krafti - Summer Camp Learning School</title>
                </Helmet>

                <section className="bg-slate-200 py-8 px-5">
                    <SectionTitle
                        subHeading="Your Awesome Trainings"
                        heading="My Classes"
                    />

                    <div className="grid md:grid-cols-2 gap-5 mx-20 md:mx-10">
                        {
                            myClasses?.map(myClass => <div key={myClass._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img src={myClass?.image} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <p><strong>Price:</strong> ${myClass?.price}</p>
                                    <h2 className="card-title text-primary font-bold">{myClass?.nameClass}</h2>
                                    <p><strong>Instructor's Name:</strong> {myClass?.instructorName}</p>
                                    <p><strong>Instructor's Email:</strong> {myClass?.instructorEmail}</p>
                                    <p><strong>Available Seats:</strong> {myClass?.seats}</p>
                                    <div className="flex justify-between items-center gap-10">
                                        <div>
                                            <p><strong>Status:</strong> {myClass?.status}</p>
                                        </div>
                                        <div>
                                            <p><strong>Enrolled:</strong> {myClass?.enroll}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions mt-4">
                                        <button onClick={() => navigate(`/dashboard/update-class/${myClass?._id}`)} className="btn btn-primary btn-sm">Update</button>
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

export default MyClasses;