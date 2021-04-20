import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import Sidebar from '../Sidebar/Sidebar';
import './Book.css';
const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let { name, email } = loggedInUser;
    const userEmail = sessionStorage.getItem('userEmail');
    const userName = sessionStorage.getItem('userName');
    if (userEmail !== null) {
        email = userEmail;
        name = userName;
    }
    const [isService, setIsService] = useState(false)
    const { serviceName } = useParams();
    const [productName, setProductName] = useState(serviceName);
    const [service, setService] = useState([])
    useEffect(() => {
        fetch(`https://pure-island-17993.herokuapp.com/service/name/${productName}`)
        .then(res => res.json())
            .then(data => {
                setService(data)
                setIsService(true)
            })
            .catch(error => {
                setIsService(false)
                setService('')
            })
    }, [productName])


    const handle = (e) => {
        setProductName(e.target.value);
    }




    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const handlePaymentSuccess = (paymentResponse) => {

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        if (paymentResponse.startsWith('pm_')) {
            if (isService) {
                const bookData = {
                    name: name,
                    email: email,
                    serviceName: service.serviceName,
                    price: service.price,
                    description: service.description,
                    imageURL: service.imageURL,
                    paymentId: paymentResponse,
                    date: new Date(),
                    status: 'Pending'
                }
                console.log(bookData)
                fetch('https://pure-island-17993.herokuapp.com/booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData)
                })
                    .then(res => res.json())
                    .then(data => {
                        alert('Your service booked successfully')
                        document.getElementById("myForm").reset();
                        setPaymentSuccess(paymentResponse)
                        setPaymentError(null);

                    })
            }
            else {
                alert('This service is invalid')
            }
        }
        else {
            setPaymentError(paymentResponse);
            setPaymentSuccess(null)

        }
    }
    const [paymentStatus, setPaymentStatus] = useState('')
    return (
        <div className="row">
            <div className='col-lg-2 col-md-3'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-lg-10 col-md-9 d-flex flex-column right-div '>
                <div className='d-flex justify-content-between title-div'>
                    <h5>Book</h5>
                    <p>{name}</p>
                </div>
                <div className='right-content book-form'>
                    <div className=" mb-5">
                        <form id="myForm" className='mt-5'>
                            <label className='input-label'>Name</label>
                            <br />
                            <input id="name" className='input-style' defaultValue={name} name="username" />
                            <br />
                            <label className='input-label'>Email</label>
                            <br />
                            <input id="email" className='input-style' defaultValue={email} name="email" />
                            <br />
                            <label className='input-label'  >Service Name</label>
                            <br />
                            <input id="serviceName" onBlur={handle} defaultValue={service.serviceName} placeholder="Service Name" className='input-style' name="service" />
                            <br />
                        </form>
                        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
                        <br />
                        <p className="input-label">Your Service Cost is {service.price || 0}</p>
                        {
                            paymentError && <p style={{ color: 'red', marginLeft: '10px' }}>{paymentError}</p>
                        }
                        {
                            paymentSuccess && <p style={{ color: 'green', marginLeft: '10px' }}>Your payment is successfull</p>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Book;