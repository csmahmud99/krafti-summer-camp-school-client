import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/sectionTitle/sectionTitle";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: payments = [], refetch } = useQuery(['payments'], async () => {
        const res = await axiosSecure.get(`/payments/${user?.email}`)
        return res.data;
    });

    console.log(payments);
    return (
        <>
            <div>
                <Helmet>
                    <title>My Payment History - Student | Krafti - Summer Camp Learning School</title>
                </Helmet>

                <section>
                    <SectionTitle
                        subHeading="See Your Life-time Investment on Skills with Us"
                        heading="My Payment History"
                    />

                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Banner</th>
                                        <th>
                                            <div className="font-bold">Class Name</div>
                                            <div className="text-sm opacity-50">Instructor's Name</div>
                                        </th>
                                        <th>Price</th>
                                        <th>Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payments.map((myPayments, index) => <tr key={myPayments?._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-square w-20 h-20">
                                                            <img src={myPayments?.image} alt="class-banner" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-bold">{myPayments?.nameClass}</div>
                                                <div className="text-sm opacity-50">{myPayments?.instructorEmail}</div>
                                            </td>
                                            <td>${myPayments?.price}</td>
                                            <th>
                                                <button className="btn btn-ghost btn-xs">{myPayments?.date}</button>
                                            </th>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default PaymentHistory;