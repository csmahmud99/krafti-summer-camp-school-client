import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider/AuthProvider";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// Image Hosting Token
const imageHostingToken = import.meta.env.VITE_imageUploadToken;

const AddClass = () => {
    const [axiosSecure] = useAxiosSecure();

    const { user } = useContext(AuthContext);

    // React Hook Form Assets
    const { register, handleSubmit, reset } = useForm();

    // Image Hosting URL
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

    const onSubmit = data => {
        // console.log(data);

        const formData = new FormData();
        formData.append("image", data.image[0]);

        fetch(imageHostingURL, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageResponse => {
                // console.log(imageResponse);
                if (imageResponse.success) {
                    const imageURL = imageResponse.data.display_url;
                    // console.log(imageURL);
                    const { nameClass, instructorName, instructorEmail, seats, price } = data;
                    const newClass = {
                        nameClass,
                        instructorName,
                        instructorEmail,
                        seats: parseInt(seats),
                        price: parseFloat(price),
                        image: imageURL,
                        status: "pending",
                        enroll: 0,
                    };
                    console.log(newClass);
                    axiosSecure.post("/classes", newClass)
                        .then(data => {
                            console.log("After posting new class:", data.data);
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'The class have been added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            });
    };
    // console.log(errors);
    // console.log(imageHostingToken);

    return (
        <>
            <div>
                <Helmet>
                    <title>Add a Class | Krafti - Summer Camp Learning School</title>
                </Helmet>
                <section className="bg-slate-200 py-8 px-5">
                    <SectionTitle
                        subHeading="Teach Something New"
                        heading="Add a Class"
                    />
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Course/Class Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Class Name</span>
                                </label>
                                <input type="text" placeholder="Enter Class Name" {...register("nameClass", { required: true, maxLength: 40 })} className="input input-bordered w-full" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-5 mt-5">
                                {/* Instructor's Read-only Default Name */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold">Instructor Name</span>
                                    </label>
                                    <input type="text" defaultValue={user?.displayName} {...register("instructorName", { required: true })} className="input input-bordered w-full" readOnly />
                                </div>


                                {/* Instructor's Read-only Default email */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold">Instructor Email</span>
                                    </label>
                                    <input type="text" defaultValue={user?.email} {...register("instructorEmail", { required: true })} className="input input-bordered w-full" readOnly />
                                </div>


                                {/* Available Seats for the Course/Class */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold">Available Seats*</span>
                                    </label>
                                    <input type="number" placeholder="Number of Available Seats" {...register("seats", { required: true })} className="input input-bordered w-full" />
                                </div>


                                {/* Price for the Course/Class */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold">Price*</span>
                                    </label>
                                    <input type="number" placeholder="Enter Class Price" {...register("price", { required: true })} className="input input-bordered w-full" />
                                </div>
                            </div>

                            {/* Choose Image File */}
                            <div className="form-control w-full mt-5">
                                <label className="label">
                                    <span className="label-text font-bold">Class Banner: Pick a file from your device*</span>
                                </label>
                                <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered file-input-primary w-full" />
                            </div>

                            <div className="text-center my-5">
                                <input type="submit" value="Add Class" className="btn btn-outline bg-primary text-white" />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AddClass;