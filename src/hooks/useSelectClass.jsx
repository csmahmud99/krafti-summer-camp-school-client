import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useSelectClass = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: selectClass = [] } = useQuery({
        queryKey: ['selectClass', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/selectClass?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    });
    return [selectClass, refetch];

};
export default useSelectClass;