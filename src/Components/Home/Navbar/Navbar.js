import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let { name } = loggedInUser;
    const userName = sessionStorage.getItem('userName');

    const handleSignOut = () => {
        setLoggedInUser({});
        sessionStorage.clear();
    }
    return (
        <div>
            <nav style={{ backgroundColor: "rgb(106,106,106)" }} className=" pl-5 navbar navbar-expand-lg navbar-dark shadow-lg fixed-top">
                <p className='pt-2 font-weight-bold text-light'>Flush-Master</p>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className='px-md-3 pt-2' to='/home'>Home</Link>
                        <a className='px-md-3 pt-2' href='#mission'>About</a>
                        <a className='px-md-3 pt-2' href='#services-bg'>Services</a>
                        <Link className='px-md-3 pt-2' to='/dashboard'>Dashboard</Link>
                        {
                            name || userName ?
                                <a href="" onClick={handleSignOut} className="px-md-3 pt-2">Logout</a>
                                :
                                <Link to="/login" className="px-md-3 pt-2">Login</Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;