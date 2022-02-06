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
            <div className='col-md-2'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-md-10 d-flex flex-column'>
                <div className='d-flex justify-content-center mt-5'>
                    <h5 className='co_title'>Book</h5>
                </div>
                <div className="mx-auto book_service w-75">
                    <form id="myForm" className='mt-2'>
                        <div className='form-group'>
                            <label>Name</label>
                            <input className='form-control' defaultValue={name} name="username" />
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input className='form-control' defaultValue={email} name="email" />
                        </div>
                        <div className='row'>
                            <div className='form-group col'>
                                <label>Service Name</label>
                                <input className='form-control' onBlur={handle} defaultValue={service.serviceName} name="service" />
                            </div>
                            <div className='form-group col'>
                                <label>Service Charge</label>
                                <input className='form-control' value={`${service.price || 0}$`} />
                            </div>
                        </div>
                    </form>
                    <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
                    {
                        paymentError && <p style={{ color: 'red', marginLeft: '10px' }}>{paymentError}</p>
                    }
                    {
                        paymentSuccess && <p style={{ color: 'green', marginLeft: '10px' }}>Your payment is successfull</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Book;