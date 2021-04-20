import React, { useMemo, useState } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import './SplitCardForm.css';


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
                <label className="input-label">
                    <p>Card number</p>

                    <CardNumberElement className="card-number" />
                </label>
                <br />
                <label className="input-label">
                    <p>Expiration date</p>
                    <CardExpiryElement className="date-input" />
                </label>
                <br />
                <label className="input-label">
                    <p>CVC</p>
                    <CardCvcElement className="cvc-input" />
                </label>
                <br />
                <button id="submit-btn" className="btn" type="submit" disabled={!stripe}>
                    Pay
        </button>
            </form>

        </div>
    );
};

export default SplitCardForm;