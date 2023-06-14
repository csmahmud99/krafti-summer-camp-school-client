import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllInstructors = () => {
    const [axiosSecure] = useAxiosSecure();

    // Using 'TanStack Query/React Query' with 'Axios Interceptor' for getting all classes created by the instructors to show the instructor's info.s on the UI/client-side 
    const { data: instructors = [] } = useQuery(["instructors"], async () => {
        const res = await axiosSecure.get("/instructors");
        return res.data;
    });

    const showInstructors = instructors?.filter(allInstructors => allInstructors?.role === "instructor");

    return (
        <>
            <div className="py-28">
                <Helmet>
                    <title>All Instructors | Krafti - Summer Camp Learning School</title>
                </Helmet>

                <section>
                    <SectionTitle
                        subHeading="People Who Dreams to Make Something New for You"
                        heading="Our Awesome Instructors"
                    />

                    <div className="grid md:grid-cols-3 gap-5 ml-10 mr-10 bg-slate-200 py-16 mt-12 px-8">
                        {
                            showInstructors.map(instructor => <div key={instructor._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img src={instructor?.photo} alt="instructor-image" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    
                                    <h2 className="card-title text-primary font-bold">{instructor?.name}</h2>

                                    <p><strong>Instructor's Email:</strong> <br /> {instructor?.email}</p>
                                </div>
                            </div>)
                        }
                    </div>
                </section>
            </div>
        </>
    );
};

export default AllInstructors;