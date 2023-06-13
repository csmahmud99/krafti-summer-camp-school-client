import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    // 3rd-level admin checking: check admin by using this Custom-hook in the client-side [Dashboard Layout : DashboardLayout.jsx].
    const { user, loading } = useContext(AuthContext);

    // Using of TanStack Query/React Query (object-form, not the short-form) for fetching the data of users for admin-checking from MongoDB to Client-side || Using 'axiosSecure' for calling the API
    const [axiosSecure] = useAxiosSecure();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ["isAdmin", user?.email],
        enabled: !loading && !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            // console.log("isAdmin response:", res);
            return res.data.admin;
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;