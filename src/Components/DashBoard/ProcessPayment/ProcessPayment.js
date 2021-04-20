import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51IeJ4GEEQAp4VXPy3gGR6YB2yRPV2WJEkkyaGhoAZvVyMac680tKXD5zgmRW6TQtXLnoqL83O66DM9ljTtaluXsN005emn9Tk9');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SplitCardForm handlePayment={handlePayment}></SplitCardForm>
        </Elements>
    );
};

export default ProcessPayment;