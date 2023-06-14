import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../components/sectionTitle/sectionTitle';

const PopularInstructor = () => {
    const [axiosSecure] = useAxiosSecure();

    // Using 'TanStack Query/React Query' with 'Axios Interceptor' for getting all classes created by the instructors to show the instructor's info.s on the UI/client-side 
    const { data: instructors = [] } = useQuery(["instructors"], async () => {
        const res = await axiosSecure.get("/instructors");
        return res.data;
    });

    const showInstructors = instructors?.filter(allInstructors => allInstructors?.role === "instructor");


    const popularInstructors = showInstructors.slice(0, 6);

    // console.log(popularInstructors);

    return (
        <>
            <div className="lg:px-8 px-1 mb-10">
                <section className="mt-5">
                    <SectionTitle
                        subHeading="Meet Our"
                        heading="Most Popular Instructors"
                    />

                    <div className='grid md:grid-cols-3 gap-5 bg-slate-200 py-16 mt-12 px-8 rounded-md'>
                        {
                            popularInstructors.map(popularInstructor => <div key={popularInstructor._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img src={popularInstructor?.photo} alt="instructor-image" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">

                                    <h2 className="card-title text-primary font-bold">{popularInstructor?.name}</h2>

                                    <p><strong>Instructor's Email:</strong> <br /> {popularInstructor?.email}</p>
                                </div>
                            </div>)
                        }
                    </div>
                </section>
            </div>
        </>
    );
};

export default PopularInstructor;