import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGooglePlusG, faSkype } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div className="bg-primary pt-5">
                <div className="container fluid justify-content-center">
                    <div className="row pt-5">
                        <div className="col-lg-3 col-md-6 px-5 pb-5">
                            <h5 className="font-weight-bold">FLUSH-MASTER</h5>
                            <div className="d-flex">
                                <a className="style" href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                                <a className="style" href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                                <a className="style" href="#"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                                <a className="style" href="#"><FontAwesomeIcon icon={faSkype} /></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 px-5 pb-5">
                            <h5 className="font-weight-bold">OUR ADDRESS</h5>
                            <p>_____</p>
                            <h6>RN Road, 234 Evenue <br />
                    California, USA</h6>
                            <h6 className="pt-3">flushmaster@gmail.com</h6>
                            <h6 className="pt-3">+123 456 789</h6>
                        </div>
                        <div className="col-lg-3 col-md-6 px-5 pb-5">
                            <h5 className="font-weight-bold">OUR SERVICES</h5>
                            <p>_____</p>
                            <ul className="list-style">
                                <li><a href="">House Plumbing</a></li>
                                <li><a href="">Pipe Clogs</a></li>
                                <li><a href="">Kitchen Installation</a></li>
                                <li><a href="">Toilet Clogs Repair</a></li>
                                <li><a href="">Appliance Repair</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 px-5">
                            <h5 className="font-weight-bold">QUICK LINKS</h5>
                            <p>_____</p>
                            <ul className="list-style">
                                <li><a href="/home">Home</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact US</a></li>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/dashboard">Dashboard</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-warning">
                <p className="text-center text-white">© 2021 - Flush-Master. Created by <span className="text-info">Rashadul Islam</span> All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;