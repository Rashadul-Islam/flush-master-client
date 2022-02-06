import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import addServiceImage from "../../../images/addservice.png";
import "./AddService.css";

const AddService = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let { name, email } = loggedInUser;
    const userEmail = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");
    if (userEmail !== null) {
        email = userEmail;
        name = userName;
    }
    const [imageURL, setImageURL] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        const serviceData = {
            serviceName: data.serviceName,
            price: data.price,
            description: data.description,
            imageURL: imageURL,
        };
        const url = "https://pure-island-17993.herokuapp.com/addService";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(serviceData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    alert("Service added successfully!!!");
                    reset();
                }
            });
    };

    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set("key", "f66e3f8a32f507f7a30c0fc37f8b7003");
        imageData.append("image", event.target.files[0]);
        axios
            .post("https://api.imgbb.com/1/upload", imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                alert(error);
            });
    };
    return (
        <div className="row">
            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10 d-flex flex-column mt-5">
                <div className="d-flex justify-content-center title-div">
                    <h5 className="co_title">Add Service</h5>
                </div>
                <form className="mt-2 mx-auto addService_div w-75" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="input-label">Service Title</label>
                        <input
                            type="text"
                            class="form-control"
                            name="serviceName"
                            placeholder="Leak pipe"
                            {...register("serviceName")}
                        />
                    </div>
                    <div className="row">
                        <div className="form-group col">
                            <label className="input-label">Service Price</label>
                            <input
                                type="number"
                                min="0"
                                class="form-control"
                                name="price"
                                placeholder="50"
                                {...register("price")}
                            />
                        </div>
                        <div className="form-group col">
                            <label className="input-label">Service Image</label>
                            <input
                                type="file"
                                class="form-control-file"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="input-label">Service Description</label>
                        <textarea
                            type="text"
                            class="form-control"
                            rows="5"
                            name="description"
                            placeholder="Description of Service......"
                            {...register("description")}
                        />
                    </div>
                    <input className="btn btn-primary" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddService;
