import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import './CheckOutForm.css';
import { AuthContext } from '../../../../providers/AuthProvider/AuthProvider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';


const CheckOutForm = ({ enrollClass }) => {
    const { nameClass, image, instructorEmail, instructorName, price, classId, _id, seats, enroll } = enrollClass || {};

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/createPaymentIntent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('error message:', error);
            setCardError(error.message);
        } else {
            // console.log('paymentMethod:', paymentMethod)
            setCardError('');
        }

        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            // console.log(confirmError);
        }
        // console.log(paymentIntent);
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                studentName: user?.displayName,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                nameClass,
                image,
                instructorEmail,
                instructorName,
                payId: _id,
                classId,
                seats,
                enroll,
                status: 'enrollPending',
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.result.insertedId) {
                        // display confirm
                    }
                })
        }
    }
    return (
        <>
            <div>
                
                <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button className="btn btn-success btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || processing} >
                        Confirm Payment
                    </button>
                </form>
                {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
                {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
            </div>
        </>
    );
};

export default CheckOutForm;