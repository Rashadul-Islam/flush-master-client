import React, { useMemo, useState } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";


const useOptions = () => {

    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize: '16px',
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        []
    );

    return options;
};

const SplitCardForm = ({ handlePayment, paymentStatus }) => {
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async event => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
        if (error) {

            handlePayment(error.message, 'error');
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();
        } else {

            handlePayment(paymentMethod.id, 'success');
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col">
                        <label>Card Number</label>
                        <CardNumberElement className="card-number" />
                    </div>
                    <div className="form-group col">
                        <label>Expire Date</label>
                        <CardExpiryElement className="date-input" />
                    </div>
                    <div className="form-group col">
                        <label>CVC</label>
                        <CardCvcElement className="cvc-input" />
                    </div>
                </div>
                <button className="btn btn-primary" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>

        </div >
    );
};

export default SplitCardForm;