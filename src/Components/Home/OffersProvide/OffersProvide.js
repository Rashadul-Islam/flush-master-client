import React from 'react';
import mark from "../../../images/checkmark.png";
import offerImg from "../../../images/offer-img.png";
import "./OffersProvide.css";

const OffersProvide = () => {
    return (
        <div>
            <h2 className="text-center font-weight-bold pt-5 mt-5">Offers We Provide</h2>
            <h5 className="text-center text-danger pt-3">here is our recent offers</h5>
            <p className="text-center color-primary">________</p>
            <div className="row pt-5">
                <div className="col-lg-6 col-md-12">
                    <img id="offer-img" src={offerImg} alt=""/>
                </div>
                <div className="col-lg-6 col-md-12 offer-text">
                    <div className="d-flex">
                        <div className="mark-area">
                            <img src={mark} alt="" />
                        </div>
                        <div className="px-4">
                            <h3 className="font-weight-bold">Super Fast Service</h3>
                            <p>We provide super fast service for our customers. Checkout our services. <br />
                            Order soon...!</p>
                        </div>
                    </div>
                    <div className="d-flex pt-5">
                        <div className="mark-area">
                            <img src={mark} alt="" />
                        </div>
                        <div className="px-4">
                            <h3 className="font-weight-bold">Plumbing material supply</h3>
                            <p>We provide rich quality product that ensure you to long last.<br />
                            Order soon...!</p>
                        </div>
                    </div>
                    <div className="d-flex pt-5">
                        <div className="mark-area">
                            <img src={mark} alt="" />
                        </div>
                        <div className="px-4">
                            <h3 className="font-weight-bold">Expert plumbers</h3>
                            <p>Out plumbers are experienced and friendly. They can deal with this things well.<br />
                            Order soon...!</p>
                        </div>
                    </div>
                    <div className="d-flex pt-5">
                        <div className="mark-area">
                            <img src={mark} alt="" />
                        </div>
                        <div className="px-4">
                            <h3 className="font-weight-bold">Advanced equipment</h3>
                            <p>We provide best quality equipment. once the equipment installed,<br /> you can forgot the matter.<br />
                            Order soon...!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OffersProvide;