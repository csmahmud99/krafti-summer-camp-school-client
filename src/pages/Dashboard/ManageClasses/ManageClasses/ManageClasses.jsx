import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();

    // Using 'TanStack Query/React Query' with 'Axios Interceptor' for getting all classes created by the instructors to show them on the UI/client-side 
    const { data: classes = [], refetch } = useQuery(["classes"], async () => {
        const res = await axiosSecure.get("/classes")
        return res.data;
    });

    // console.log(classes);

    // 'Approve' Button for Class Approval State Change
    const handleApproveClass = id => {
        fetch(`https://krafti-summer-camp-school-server.vercel.app/classes/approved/${id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Class is Approved Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
    };


    // 'Deny' Button for Class Approval State Change
    const handleDeniedClass = id => {
        fetch(`https://krafti-summer-camp-school-server.vercel.app/classes/denied/${id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: 'warning',
                        title: 'Class is Denied!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
    };

    return (
        <>
            <div>
                <Helmet>
                    <title>Manage Classes - Admin | Krafti - Summer Camp Learning School</title>
                </Helmet>

                <section className="bg-slate-200 py-8 px-5">
                    <SectionTitle
                        subHeading="All Classes Created by the Instructor is Here"
                        heading="Manage Classes"
                    />

                    <div className="grid md:grid-cols-2 gap-5 mx-20 md:mx-10">
                        {
                            classes.map(classCard => <div key={classCard._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img src={classCard?.image} alt="class-banner" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <p><strong>Price:</strong> ${classCard?.price}</p>
                                    <h2 className="card-title text-primary font-bold">{classCard?.nameClass}</h2>

                                    <p><strong>Instructor's Name:</strong> {classCard?.instructorName}</p>
                                    <p><strong>Instructor's Email:</strong> {classCard?.instructorEmail}</p>
                                    <p><strong>Available Seats:</strong> {classCard?.seats}</p>
                                    <p><strong>Status:</strong> {classCard?.status}</p>
                                    
                                    <div className="card-actions flex items-center justify-between mt-4">
                                        {
                                            classCard.status === "Approved" || classCard.status === "Denied"
                                                ? <button disabled className="btn btn-primary btn-sm">Approve</button>
                                                : <button onClick={() => handleApproveClass(classCard._id)} className='btn btn-primary btn-sm'>Approve</button>
                                        }
                                        {
                                            classCard.status === "Approved" || classCard.status === "Denied"
                                                ? <button disabled className="btn btn-primary btn-sm">Deny</button>
                                                : <button onClick={() => handleDeniedClass(classCard._id)} className='btn btn-primary btn-sm'>Deny</button>
                                        }
                                        <button onClick={() => window.my_modal_3.showModal()} className="btn btn-primary btn-sm">Send Feedback</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>

                    <div>
                        <dialog id="my_modal_3" className="modal">
                            <form method="dialog" className="modal-box">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                <h3 className="font-bold text-lg">Class Denied ! Write Your Feedback Here</h3>
                            </form>
                        </dialog>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ManageClasses;