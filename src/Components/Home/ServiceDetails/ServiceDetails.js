import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './ServiceDetails.css';

const ServiceDetails = (props) => {
    const history = useHistory();

    const handleService = serviceName => {
        history.push(`/booking/${ serviceName }`)
    }
    const { serviceName, price, description, imageURL} = props.service;

    return (
        <div className="d-flex justify-content-center col  pb-5 pt-5">
            <div className="card card-style" onClick={() => handleService(serviceName)}>
                <div className="card-body p-4">
                    <div className="pt-3 d-flex justify-content-between align-items-center">
                        <div>
                            <img className="card-img" src={imageURL} alt="" />
                        </div>
                        <div>
                            <strong className="text-info">${price}</strong>
                        </div>
                    </div>
                    <h4 className="pt-4 text-warning font-weight-bold">{serviceName}</h4>
                    <p className="pt-2 pb-2">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;