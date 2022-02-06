import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import './BookingList.css';
import Rotate from 'react-reveal/Rotate';

const BookingList = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let { name, email, token } = loggedInUser;
    const [bookings, setBookings] = useState([]);
    const userToken = sessionStorage.getItem('token');
    const userEmail = sessionStorage.getItem('userEmail');
    const userName = sessionStorage.getItem('userName');
    if (userToken !== null) {
        token = userToken;
        email = userEmail;
        name = userName;
    }

    useEffect(() => {

        fetch('https://pure-island-17993.herokuapp.com/bookings?email=' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setBookings(data)
            })
    })
    return (

        <div className="row">
            <div className='col-md-2'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-md-10 d-flex flex-column right-div '>
                <div className='d-flex justify-content-center title-div'>
                    <h5 className='co_title'>Booking List</h5>
                </div>
                <div className="row">
                    {
                        bookings.map(book => <Rotate top left key={book._id}><div className="col-lg-4 col-md-6">
                            <div className="book-card">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <img className="card-icon" src={book.imageURL} alt="" />
                                    </div>
                                    <div>
                                        <strong className="text-right status">{book.status}</strong>
                                    </div>
                                </div>
                                <p className="mt-2 text-dark font-weight-bold">{book.serviceName}</p>
                                <p>{book.description}</p>
                            </div>
                        </div>
                        </Rotate>)}
                </div>


            </div>
        </div>


    );
};

export default BookingList;
