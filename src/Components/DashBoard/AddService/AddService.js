import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import './AddService.css';

const AddService = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let { name, email } = loggedInUser;
    const userEmail =sessionStorage.getItem('userEmail');
    const userName =sessionStorage.getItem('userName');
    if(userEmail !==  null){
        email= userEmail;
        name = userName;
    }
    const [imageURL, setImageURL] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const serviceData = {
            serviceName: data.serviceName,
            price: data.price,
            description: data.description,
            imageURL: imageURL
        }
        const url = "https://pure-island-17993.herokuapp.com/addService"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serviceData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Service added successfully!!!');
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
                console.log(error);
            });
    }
    return (
        <div className="row">
            <div className='col-lg-2 col-md-3'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-lg-10 col-md-9 d-flex flex-column right-div'>
                <div className='d-flex justify-content-between title-div'>
                    <h5>Add Service</h5>
                    <p>{name}</p>
                </div>
                <div className='right-content book-form'>
                    <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                        <label className="input-label">Service Title</label>
                        <br />
                        <input className="input-style " name="serviceName" placeholder="Service Title" {...register("serviceName")} />
                        <br />
                        <label className="input-label">price</label>
                        <br />
                        <input className="input-style " name="price" placeholder="Service Price" {...register("price")} />
                        <br />
                        <label className="input-label">Description</label>
                        <br />
                        <input className="input-style" name="description" placeholder="Description" {...register("description")} />
                        <br />
                        <label className="input-label">Image</label>
                        <br />
                        <input className="img-input " type="file" onChange={handleImageUpload} required />
                        <br />
                        <input id="submit-btn" className='btn' type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddService;