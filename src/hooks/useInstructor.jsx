import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useInstructor = () => {
    // 3rd-level Instructor checking: check Instructor by using this Custom-hook in the client-side [Dashboard Layout : DashboardLayout.jsx].

    const { user, loading } = useContext(AuthContext);

    // Using of TanStack Query/React Query (object-form, not the short-form) for fetching the data of users for instructor-checking from MongoDB to Client-side || Using 'axiosSecure' for calling the API
    const [axiosSecure] = useAxiosSecure();

    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
        queryKey: ["isInstructor", user?.email],
        enabled: !loading && !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
            // console.log("isInstructor response:", res);
            return res.data.instructor;
        }
    });

    console.log(isInstructor);

    return [isInstructor, isInstructorLoading];
};

export default useInstructor;