import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider/AuthProvider";
import { useForm } from 'react-hook-form';

const AddClass = () => {
    const { user } = useContext(AuthContext);

    // React Hook Form Assets
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    };
    console.log(errors);

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
                                <input type="text" placeholder="Enter Class Name" {...register("class", { required: true, maxLength: 40 })} className="input input-bordered w-full" />
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