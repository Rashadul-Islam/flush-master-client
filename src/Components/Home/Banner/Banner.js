import React from "react";
import './Banner.css';
import BannerText from "./BannerText";
import image from "../../../images/plumber-3.png";


const Banner = () => {


    return (
        <div className="banner mt-5 row">
            <div className="font-weight-bold mt-5 col-md-12 d-flex justify-content-center">
                <BannerText></BannerText>
            </div>
            <div className="col-md-12 d-flex justify-content-center">
                <img className="img-fluid" src={image} alt="" />
            </div>
        </div>
    );
};
export default Banner;