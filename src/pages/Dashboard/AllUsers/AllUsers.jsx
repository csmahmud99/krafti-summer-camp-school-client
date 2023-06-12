import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AllUsers = () => {
    // Using of TanStack Query/React Query for fetching users data from MongoDB to Client-side
    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await fetch("http://localhost:5000/users");
        return res.json();
    });

    // Make Admin Function for the "Make Admin" button
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
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
                    })
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
                                        <td>
                                            <button className="btn btn-outline bg-primary text-white btn-sm">Make Instructor</button>
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