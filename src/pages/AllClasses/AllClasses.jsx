import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useSelectClass from "../../hooks/useSelectClass";

const AllClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [selectClass, refetch] = useSelectClass();

    const selectedId = selectClass.map(singleSelectClass => singleSelectClass.classId);

    console.log(selectedId);

    // Using 'TanStack Query/React Query' with 'Axios Interceptor' for getting all approved classes created by the instructors and approved by the admin to show them on the UI/client-side 
    const { data: classes = [] } = useQuery(["classes"], async () => {
        const res = await axiosSecure.get("/classes");
        return res.data;
    });

    const approvedClasses = classes?.filter(allClasses => allClasses?.status === "Approved");

    const handleSelectClass = (selectedClass) => {
        const { nameClass, image, instructorEmail, instructorName, price, seats, _id, enroll } = selectedClass || {};

        if (user && user?.email) {
            const selectClass = { nameClass, image, instructorEmail, email: user?.email, instructorName, price, seats, classId: _id, enroll, status: "Selected" };
            axiosSecure.post("/selectClass", selectClass)
                .then(data => {
                    console.log(data);
                    if (data.data.insertedId) {
                        console.log(data.data.insertedId);
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: `${nameClass} is Selected Successfully`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please Login at First to Select this Class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    return (
        <>
            <div className="py-28">
                <Helmet>
                    <title>All Classes | Krafti - Summer Camp Learning School</title>
                </Helmet>

                <section>
                    <SectionTitle
                        subHeading="Shine Yourself by Gaining New Skills"
                        heading="Our Classes"
                    />

                    <div className="grid md:grid-cols-3 gap-5 ml-10 mr-10 bg-slate-200 py-16 mt-12 px-8">
                        {
                            approvedClasses.map(approvedClass => <div key={approvedClass._id} className={`card w-96 shadow-xl ${approvedClass?.seats === 0 ? "bg-red-300" : "bg-base-100"}`}>
                                <figure className="px-10 pt-10">
                                    <img src={approvedClass?.image} alt="class-banner" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <p><strong>Price:</strong> ${approvedClass?.price}</p>
                                    <h2 className="card-title text-primary font-bold">{approvedClass?.nameClass}</h2>

                                    <p><strong>Instructor's Name:</strong> {approvedClass?.instructorName}</p>

                                    <p><strong>Available Seats:</strong> {approvedClass?.seats}</p>

                                    <div className="card-actions">
                                        {
                                            <button disabled={isAdmin || isInstructor || selectedId.includes(approvedClass._id) || approvedClass?.seats === 0} onClick={() => handleSelectClass(approvedClass)} className="btn btn-primary">Select</button>
                                        }
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

export default AllClasses;