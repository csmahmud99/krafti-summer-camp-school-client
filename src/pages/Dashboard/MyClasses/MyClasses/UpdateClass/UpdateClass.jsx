import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../../components/sectionTitle/sectionTitle";
import Swal from "sweetalert2";

const UpdateClass = () => {

    const { id } = useParams();
    // console.log(id);

    const [axiosSecure] = useAxiosSecure();

    const { data: myClass = [], refetch } = useQuery(["myClass"], async () => {
        const res = await axiosSecure.get(`/myClass/${id}`)
        return res.data;
    });

    console.log(myClass);

    const { nameClass, image, price, seats } = myClass;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = data => {
        const { nameClass, price, seats, image } = data;
        const updateItem = { nameClass, seats: parseInt(seats), price: parseFloat(price), image: image }
        axiosSecure.put(`/classes/${id}`, updateItem)
            .then(data => {
                reset();
                refetch();
                if (data.data?.modifiedCount) {
                    Swal.fire(
                        'Good job!',
                        'Your Class is Updated Successfully.',
                        'success'
                    );
                }
                console.log('after add a new data', data.data);
            });
    };

    return (
        <>
            <div className='px-32'>
                <Helmet>
                    <title>Update a Class - Instructor | Krafti - Summer Camp Learning School</title>
                </Helmet>

                <section className="bg-slate-200 py-8 px-5">
                    <SectionTitle
                        subHeading="Something New?"
                        heading="Update this Class"
                    />
                    <p className="text-primary text-2xl font-extrabold text-center -mt-4">
                        : {nameClass}
                    </p>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Course/Class Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Class Name</span>
                                </label>
                                <input type="text" defaultValue={nameClass} placeholder="Enter Class Name" {...register("nameClass", { required: true, maxLength: 40 })} className="input input-bordered w-full" />
                                {errors.nameClass && <span className='text-red-600 animate-pulse'>Class Name - is required</span>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-5 mt-5">
                                {/* Available Seats for the Course/Class */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold">Available Seats*</span>
                                    </label>
                                    <input type="number" defaultValue={seats} placeholder="Number of Available Seats" {...register("seats", { required: true })} className="input input-bordered w-full" />
                                    {errors.seats && <span className='text-purple-600 animate-pulse'>Available Seats - is required</span>}
                                </div>


                                {/* Price for the Course/Class */}
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold">Price*</span>
                                    </label>
                                    <input type="number" defaultValue={price} placeholder="Enter Class Price" {...register("price", { required: true })} className="input input-bordered w-full" />
                                    {errors.price && <span className='text-purple-600 animate-pulse'>Price - is required</span>}
                                </div>
                            </div>

                            {/* Choose Image File */}
                            <div className="form-control w-full mt-5">
                                <label className="label">
                                    <span className="label-text font-bold">Class Banner: Pick a file from your device*</span>
                                </label>
                                <input type="text" defaultValue={image} placeholder="Enter Your ImageBB URL Here" {...register("image", { required: true })} className="file-input file-input-bordered file-input-primary w-full" />
                            </div>

                            <div className="text-center my-5">
                                <input type="submit" value="Update Now" className="btn btn-outline bg-primary text-white" />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
};

export default UpdateClass;