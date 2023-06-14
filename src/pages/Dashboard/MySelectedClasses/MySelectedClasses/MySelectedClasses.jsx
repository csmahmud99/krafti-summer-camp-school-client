import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import useSelectClass from "../../../../hooks/useSelectClass";
import { useNavigate } from "react-router-dom";

const MySelectedClasses = () => {
    const [selectClass, refetch] = useSelectClass();
    const navigate = useNavigate();

    return (
        <>
            <div>
                <Helmet>
                    <title>My Selected Classes - Student | Krafti - Summer Camp Learning School</title>
                </Helmet>

                <section>
                    <SectionTitle
                        subHeading="I Want to Enrich Myself"
                        heading="My Selected Classes"
                    />

                    <div className="grid md:grid-cols-2 gap-5 ml-10 mr-10 bg-slate-200 py-16 mt-12 px-8">
                        {
                            selectClass.map(mySelectedClass => <div key={mySelectedClass._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img src={mySelectedClass?.image} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <p><strong>Price:</strong> ${mySelectedClass?.price}</p>

                                    <h2 className="card-title text-primary font-bold">{mySelectedClass?.nameClass}</h2>

                                    <p><strong>Instructor's Name:</strong> {mySelectedClass?.instructorName}</p>

                                    <div className="flex items-center justify-between gap-10 card-actions">
                                        <button onClick={() => navigate(`/dashboard/payment/${mySelectedClass._id}`)} className="btn btn-primary">Pay</button>
                                        <button className="btn btn-outline bg-red-600 text-white">Delete</button>
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

export default MySelectedClasses;