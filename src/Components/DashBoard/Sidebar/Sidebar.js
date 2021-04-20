import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, UserContext2 } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faPlusSquare, faUserPlus, faTasks, faCommentDots, faCartPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'


const Sidebar = () => {
    const [loggedInUser, setLoggedInUser]=useContext(UserContext);

    const [isAdmin, setIsAdmin] = useContext(UserContext2);

    const handleSignOut = () => {
        setLoggedInUser({});
        sessionStorage.clear();
    }

    return (
        <div className="sidebar py-5 px-4  d-flex flex-column justify-content-between">
            <div>
                <h5 className='sidebar-title'>Dashboard</h5>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/home" className="text-white">
                            <span className="link-style"><FontAwesomeIcon icon={faHome} /> Home</span>
                        </Link>
                    </li>
                    {
                        !isAdmin && <div>
                            <li>
                                <Link to="/book" className="text-white">
                                    <span className="link-style"><FontAwesomeIcon icon={faCartPlus} /> Book</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/bookList" className="text-white">
                                    <span className="link-style"><FontAwesomeIcon icon={faList} /> Booking List</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/review" className="text-white">
                                    <span className="link-style"><FontAwesomeIcon icon={faCommentDots} /> Review</span>
                                </Link>
                            </li>
                        </div>
                    }
                    {
                        isAdmin && <div>
                            <li>
                                <Link to="/dashboard" className="text-white">
                                    <span className="link-style"><FontAwesomeIcon icon={faList} /> Order List</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addService" className="text-white">
                                    <span className="link-style"><FontAwesomeIcon icon={faPlusSquare} /> Add Service</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/makeAdmin" className="text-white">
                                    <span className="link-style"><FontAwesomeIcon icon={faUserPlus} /> Make Admin</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/manageServices" className="text-white">
                                    <span className="link-style"><FontAwesomeIcon icon={faTasks} /> Manage Services</span>
                                </Link>
                            </li>
                        </div>
                    }
                </ul>
            </div>
            <div>
                <Link to="/" onClick={handleSignOut} className="text-white"> <span className="link-style"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</span></Link>
            </div>
        </div>
    );
};

export default Sidebar;