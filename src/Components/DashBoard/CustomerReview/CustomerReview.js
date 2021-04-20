import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import './CustomerReview.css';
const ReviewDashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let { name, email } = loggedInUser;
    const userEmail = sessionStorage.getItem('userEmail');
    const userName = sessionStorage.getItem('userName');
    if (userEmail !== null) {
        email = userEmail;
        name = userName;
    }

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data)
        const reviewData = {
            reviewerName: data.userName,
            designation: data.designation,
            description: data.description
        }

        const url = `https://pure-island-17993.herokuapp.com/addReview`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Review Placed successfully!!!');
                    reset();
                }
            })
    };
    return (
        <div className="row">
            <div className='col-lg-2 col-md-3'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-lg-10 col-md-9 d-flex flex-column right-div '>
                <div className='d-flex justify-content-between title-div'>
                    <h5>Review</h5>
                    <p>{name}</p>
                </div>
                <div className='right-content book-form'>
                    <div className=" mb-5">
                        <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                            <input className='input-style' name="userName" {...register("userName")} placeholder="Name" />
                            <br />
                            <input className='input-style' name="designation" {...register("designation")} placeholder="Company's Name. Designation" />
                            <br />
                            <input className='input-large-style' name="description" {...register("description")} placeholder="Description" />
                            <br />
                            <input id="submit-btn" className='btn ' type="submit" />
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ReviewDashboard;