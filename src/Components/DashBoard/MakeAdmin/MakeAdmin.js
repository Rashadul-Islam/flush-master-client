import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';

const MakeAdmin = () => {
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
        const adminData = {
            email: data.email,
        }
        fetch('https://pure-island-17993.herokuapp.com/addAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData)
        })
            .then(res => res.json())
            .then(data => {
                alert('Admin added successfully')

                reset();

            })
    };


    return (
        <div className="row">
            <div className='col-lg-2 col-md-3'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-lg-10 col-md-9 d-flex flex-column right-div '>
                <div className='d-flex justify-content-between title-div'>
                    <h5>Make Admin</h5>
                    <p>{name}</p>
                </div>
                <div className='right-content book-form'>
                    <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                        <label className='input-label'>Email</label>
                        <br />
                        <input className="input-style" name="email" placeholder="john@gmail.com" {...register("email")} />
                        <br />
                        <input id="submit-btn" className='btn' type="submit" />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default MakeAdmin;