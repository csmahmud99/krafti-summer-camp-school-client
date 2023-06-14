import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import CheckOutForm from '../CheckOutForm/CheckOutForm';
import useSelectClass from '../../../../hooks/useSelectClass';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_paymentPublishableId);

const Payment = () => {
    const [selectClass] = useSelectClass();
    const { id } = useParams();
    const enrollClass = selectClass.find(thisClass => thisClass._id === id);
    // console.log(id);
    // console.log(enrollClass);

    return (
        <>
            <div>
                <Helmet>
                    <title>Payment | Krafti - Summer Camp Learning School</title>
                </Helmet>

                <Elements stripe={stripePromise}>
                    <CheckOutForm enrollClass={enrollClass} />
                </Elements>
            </div>
        </>
    );
};

export default Payment;