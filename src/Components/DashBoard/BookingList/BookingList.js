import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import './BookingList.css';



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
                authorization: `Bearer ${ token }`
            }
        })
        .then(res => res.json())
    .then(data => {
        setBookings(data)
    })
    }, [token])

return (

    <div className="row">
        <div className='col-lg-2 col-md-3'>
            <Sidebar></Sidebar>
        </div>
        <div className='col-lg-10 col-md-9 d-flex flex-column right-div '>
            <div className='d-flex justify-content-between title-div'>
                <h5>Booking List</h5>
                <p>{name}</p>
            </div>

            <div className=" row ">
                {
                    bookings.map(book => <div key={book._id} className="col-lg-4 col-md-6  ">
                        <div className="book-card">
                            <div className="pt-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <img className="card-icon" src={book.imageURL} alt="" />
                                </div>
                                <div>
                                    <strong className="text-left">{book.status}</strong>
                                </div>
                            </div>
                            <p className="pt-4 text-dark font-weight-bold">{book.serviceName}</p>
                            <p className="pt-2 pb-2">{book.description}</p>
                        </div>
                    </div>)


                }
            </div>


        </div>
    </div>


);
};

export default BookingList;
