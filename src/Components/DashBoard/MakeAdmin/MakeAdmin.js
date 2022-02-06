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
            <div className='col-md-2'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-md-10 d-flex flex-column mt-5'>
                <div className='d-flex justify-content-center'>
                    <h5 className='co_title'>Make Admin</h5>
                </div>
                <div className='mx-auto w-50 addService_div'>
                    <form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-group'>
                            <label>Email</label>
                            <input className="form-control" name="email" placeholder="john@gmail.com" {...register("email")} />
                        </div>
                        <input className='btn btn-primary' type="submit" />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default MakeAdmin;