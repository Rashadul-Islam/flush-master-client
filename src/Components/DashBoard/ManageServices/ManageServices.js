import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { UserContext } from "../../../App";

const ManageServices = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let { name, email, token } = loggedInUser;
    const [bookings, setBookings] = useState([]);
    const userToken = sessionStorage.getItem("token");
    const userEmail = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");
    if (userToken !== null) {
        token = userToken;
        email = userEmail;
        name = userName;
    }

    // const [imageURL, setImageURL] = useState(null);
    const [editOptionDiv, setEditOptionDiv] = useState(false);

    // load all services
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch("https://pure-island-17993.herokuapp.com/services")
            .then((res) => res.json())
            .then((data) => setServices(data));
    }, [services]);

    //delete service
    const handleDelete = (id) => {
        fetch(`https://pure-island-17993.herokuapp.com/delete/${id}`, {
            method: "DELETE",
        }).then((res) => res.json());
    };

    const [service, setService] = useState([]);
    const handleEdit = (id) => {
        setEditOptionDiv(true);
        fetch(`https://pure-island-17993.herokuapp.com/service/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setService(data);
            });
    };
    const { _id, serviceName, price, description, imageURL } = service;

    //image upload handler
    const [image, setImage] = useState(undefined);
    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set("key", "f66e3f8a32f507f7a30c0fc37f8b7003");
        imageData.append("image", event.target.files[0]);
        axios
            .post("https://api.imgbb.com/1/upload", imageData)
            .then(function (response) {
                setImage(response.data.data.display_url);
            })
            .catch(function (error) {
                alert(error);
            });
    };

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        let imgLink = image !== undefined ? image : imageURL;
        const serviceData = {
            serviceName: data.serviceName || serviceName,
            price: data.price || price,
            description: data.description || description,
            imageURL: imgLink,
        };
        const id = _id;

        fetch(`https://pure-island-17993.herokuapp.com/update/${id}`, {
            method: "PATCH",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(serviceData),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Service updated successfully!!!");
                setEditOptionDiv(false);
            });
    };
    return (
        <div className="row">
            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10 d-flex flex-column right-div pt-5">
                <div className="d-flex justify-content-center title-div">
                    {editOptionDiv ? <h5>Edit Service</h5> : <h5>Manage Service</h5>}
                </div>
                {editOptionDiv ? (
                    <div className="mx-auto w-75 addService_div">
                        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label className="input-label">Service Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={serviceName}
                                    name="serviceName"
                                    placeholder="Service Title"
                                    {...register("serviceName")}
                                />
                            </div>
                            <div className="row">
                                <div className="form-group col">
                                    <label className="input-label">Service Price</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="price"
                                        defaultValue={price}
                                        {...register("price")}
                                    />
                                </div>
                                <div className="form-group col">
                                    <label className="input-label">Service Image</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="input-label">Service Description</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    rows="5"
                                    defaultValue={description}
                                    name="description"
                                    {...register("description")}
                                    placeholder="Description of Service......"
                                />
                            </div>
                            <input className="btn btn-primary" type="submit" />
                        </form>
                    </div>
                ) : (
                    <div className=" d-flex justify-content-center mt-3 pb-5">
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
                                {services.map((service) => (
                                    <tr key={service._id}>
                                        <td data-label="Name">{service.serviceName}</td>
                                        <td data-label="Email" style={{ wordWrap: "break-word" }}>
                                            {service.description}
                                        </td>
                                        <td data-label="Service">{service.price}</td>
                                        <td data-label="Status">
                                            {" "}
                                            <p>
                                                <span
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDelete(service._id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </span>{" "}
                                                <span
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleEdit(service._id)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </span>
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageServices;
