import React, { useContext } from 'react';
import siteLogo from '../../../images/site-logo.png';
import './NavbarTop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const NavbarTop = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let { name } = loggedInUser;
    const userName = sessionStorage.getItem('userName');

    const handleSignOut = () => {
        setLoggedInUser({});
        sessionStorage.clear();
    }
    return (
        <div className='row top-navbar pb-2 pl-4'>
            <div className="col-xl-6 col-md-3 d-flex align-items-center">
                <img className='logo-img' src={siteLogo} alt="" />
                <strong>Flush-Master</strong>
            </div>
            <div className="col-xl-2 col-md-4 pt-2 pl-4 d-flex align-items-center">
                <div>
                    <p>EMERGENCY CALL</p>
                    <h5><FontAwesomeIcon icon={faPhoneAlt} /> 01780125541</h5>
                </div>
            </div>
            <div className="col-xl-2 col-md-3 pt-2 pl-4 d-flex align-items-center">
                <div>
                    <p>OFFICE CALL</p>
                    <h5><FontAwesomeIcon icon={faPhoneAlt} /> 01712688554</h5>
                </div>
            </div>
            <div className="col-xl-2 col-md-2 d-flex justify-content-left pt-2 pl-4 align-items-center">
                {
                    name || userName ?
                        <button onClick={handleSignOut} className="btn btn-danger">Logout</button>
                        :
                        <Link to="/login" className="btn btn-success">Login</Link>
                }
            </div>
        </div>
    );
};

export default NavbarTop;