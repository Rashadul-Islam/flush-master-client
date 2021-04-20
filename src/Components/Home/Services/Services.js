import React, { useEffect, useState } from 'react';
import ServiceDetails from '../ServiceDetails/ServiceDetails';
import "./Services.css";

const Services = () => {
    const [serviceData, setServiceData] = useState ([]);
    
    useEffect(() => {
        fetch('https://pure-island-17993.herokuapp.com/services')
            .then(res => res.json())
            .then(data => {
                setServiceData(data);
            })
    }, [setServiceData])
    return (
        <div id="services-bg">
            <h2 className="text-center pb-2 text-white font-weight-bold pt-5">Services We Provide</h2>
            <h5 className="text-center text-success">We Are Providing Below Services</h5>
            <p className="text-center pb-2 text-white">___________</p>
            <div className="container pb-3">
                <div className="row">
                    {
                        serviceData.map(service => <ServiceDetails key={service._id} service={service}></ServiceDetails>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Services;