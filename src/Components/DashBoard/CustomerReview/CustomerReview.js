import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import './CustomerReview.css';
import { useState } from 'react';
const ReviewDashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [imageURL, setImageURL] = useState(null);
    let { name, email } = loggedInUser;
    const userEmail = sessionStorage.getItem('userEmail');
    const userName = sessionStorage.getItem('userName');
    if (userEmail !== null) {
        email = userEmail;
        name = userName;
    }

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const reviewData = {
            reviewerName: data.userName,
            designation: data.designation,
            description: data.description,
            imageURL: imageURL
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

    const handleImageUpload = event => {
        const imageData = new FormData()
        imageData.set('key', 'f66e3f8a32f507f7a30c0fc37f8b7003');
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    return (
        <div className="row">
            <div className='col-md-2'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-md-10 d-flex flex-column right-div mt-5'>
                <div className='d-flex justify-content-center title-div'>
                    <h5>Customer Feedback</h5>
                </div>
                <div className='mx-auto w-75'>
                    <form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-group'>
                            <label>Customer Name</label>
                            <input className='form-control' name="userName" {...register("userName")} placeholder="MR. john" />
                        </div>
                        <div className='row'>
                            <div className='form-group col'>
                                <label>Company's Name OR Designation</label>
                                <input className='form-control' name="designation" {...register("designation")} placeholder="CEO" />
                            </div>
                            <div className='form-group col'>
                                <label>Customer Image</label>
                                <input className='form-control-file' type="file" onChange={handleImageUpload} required />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>DEscription</label>
                            <textarea className='form-control' type="text" rows={5} name="description" {...register("description")} placeholder=" about services..." />
                        </div>
                        <input className='btn btn-primary' type="submit" />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default ReviewDashboard;