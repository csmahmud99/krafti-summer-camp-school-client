import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    // Using of TanStack Query/React Query (short-form, not the object-form) for fetching users data from MongoDB to Client-side || Using 'axiosSecure' for calling the API
    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await axiosSecure.get("/users");
        console.log("Response from axios:", res);
        return res.data;
    });

    // Make Admin Function for the "Make Admin" button
    const handleMakeAdmin = user => {
        fetch(`https://krafti-summer-camp-school-server.vercel.app/users/admin/${user._id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is successfully made as an admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };


    // Make Instructor Function for the "Make Instructor" button
    const handleMakeInstructor = user => {
        fetch(`https://krafti-summer-camp-school-server.vercel.app/users/instructor/${user._id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is successfully made as an instructor`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <>
            <Helmet>
                <title>All Users | Krafti - Summer Camp Learning School</title>
            </Helmet>

            <div className="bg-slate-200 py-5 px-3">
                <div className="mb-8">
                    <h1 className="text-5xl font-semibold text-center">
                        <span className="text-primary">Total Users:</span> {users.length}
                    </h1>
                </div>

                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="text-xl">
                                    <th>#</th>
                                    <th>Profile Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin Role</th>
                                    <th>Instructor Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user.photo} alt="user-profile-image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold text-primary">{user.name}</div>
                                        </td>
                                        <td>
                                            <div className="text-sm opacity-75">{user.email}</div>
                                        </td>

                                        {/* 'Make Admin' Button */}
                                        <td>
                                            {
                                                user.role === "admin"
                                                    ? <>
                                                        <button className="btn btn-outline bg-primary text-white btn-sm" disabled>Make Admin</button>
                                                    </>
                                                    : <>
                                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-outline bg-primary text-white btn-sm">Make Admin</button>
                                                    </>
                                            }
                                        </td>

                                        {/* 'Make Instructor' Button */}
                                        <td>
                                            {
                                                user.role === "instructor"
                                                    ? <>
                                                        <button className="btn btn-outline bg-primary text-white btn-sm" disabled>Make Instructor</button>
                                                    </>
                                                    : <>
                                                        <button onClick={() => handleMakeInstructor(user)} className="btn btn-outline bg-primary text-white btn-sm">Make Instructor</button>
                                                    </>
                                            }
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllUsers;