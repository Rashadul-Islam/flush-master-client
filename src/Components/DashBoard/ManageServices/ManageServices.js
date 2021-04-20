import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../../App';

const ManageServices = () => {
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

    // const [imageURL, setImageURL] = useState(null);
    const [editOptionDiv, setEditOptionDiv] = useState(false)

    // load all services
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://pure-island-17993.herokuapp.com/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [services])

    //delete service
    const handleDelete = id => {
        fetch(`https://pure-island-17993.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
    }

    const [service, setService] = useState([]);
    const handleEdit = id => {
        
        setEditOptionDiv(true);
        fetch(`https://pure-island-17993.herokuapp.com/service/${id}`)
            .then(res => res.json())
            .then(data => {
                setService(data);
            })
    }
    const { _id, serviceName, description, imageURL } = service;

    //image upload handler
    const [image, setImage] = useState(undefined);
    const handleImageUpload = event => {
        const imageData = new FormData()
        imageData.set('key', 'f66e3f8a32f507f7a30c0fc37f8b7003');
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImage(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        let imgLink = (image !== undefined) ? image : imageURL;
        const serviceData = {
            serviceName: data.serviceName,
            description: data.description,
            imageURL: imgLink
        }
        console.log(serviceData);
        const id = _id;

        fetch(`https://pure-island-17993.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(serviceData)
        })
            .then(res => res.json())
            .then(data => {
                alert('Service updated successfully!!!');
                setEditOptionDiv(false);
            })
    }
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
                <div className=" d-flex justify-content-center mt-5 pb-5">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Service Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                services.map(service => <tr key={service._id}>
                                    <td data-label="Name">{service.serviceName}</td>
                                    <td data-label="Email" style={{ wordWrap: 'break-word' }}>{service.description}</td>
                                    <td data-label="Service">{service.price}</td>
                                    <td data-label="Status"> <p ><span style={{ cursor: 'pointer' }} onClick={() => handleDelete(service._id)}><FontAwesomeIcon icon={faTrashAlt} /></span>   <span style={{ cursor: 'pointer' }} onClick={() => handleEdit(service._id)}><FontAwesomeIcon icon={faEdit} /></span></p></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {
                    editOptionDiv && <div className=" right-content ">
                        <h3 className="text-center pt-5">Edit Service</h3>
                        <div className="book-form  mb-5">
                            <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                                <label className='input-label'>Service Title</label>
                                <br />
                                <input className='input-style' defaultValue={serviceName} name="serviceName" placeholder="Service Title" {...register("serviceName")} />
                                <br />
                                <label className='input-label'  >Description</label>
                                <br />
                                <input className='input-style' defaultValue={description} name="description" placeholder="Description" {...register("description")} />
                                <br />
                                <label className='input-label'>Image</label>
                                <br />
                                <input className="img-input" type="file" onChange={handleImageUpload} />
                                <br />
                                <input id="submit-btn" className='btn' type="submit" />
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ManageServices;