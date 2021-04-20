import React, { useContext, useState } from 'react';
import siteLogo from '../../../images/site-logo.png';
import './NavbarTop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const NavbarTop = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let { name} = loggedInUser;
    const userName = sessionStorage.getItem('userName');

    const handleSignOut = () => {
        setLoggedInUser({});
        sessionStorage.clear();
    }
    return (
        <div className='row top-navbar pb-3'>
            <div className="col-md-6 pl-5 d-flex align-items-center">
                <img className='logo-img' src={siteLogo} alt="" />
                <strong>Flush-Master</strong>
            </div>
            <div className="col-md-2 pt-4 pl-5">
                <p>EMERGENCY SERVICE</p>
                <h5><FontAwesomeIcon icon={faPhoneAlt} /> 0178012554</h5>
            </div>
            <div className="col-md-2 pt-4 pl-5">
                <div>
                    <p>CALL OFFICE</p>
                    <h5><FontAwesomeIcon icon={faPhoneAlt} /> 01712688554</h5>
                </div>
            </div>
            <div className="col-md-2 d-flex justify-content-left pt-4 pl-5 align-items-center">
                {
                    name|| userName ?
                        <button onClick={handleSignOut} className="btn btn-danger">Logout</button>
                        :
                        <Link to="/login" className="btn btn-success">Login</Link>
                }
            </div>
        </div>
    );
};

export default NavbarTop;