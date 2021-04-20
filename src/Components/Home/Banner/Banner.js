import React from "react";
import './Banner.css';
import BannerText from "./BannerText";
import image from "../../../images/plumber-3.png";


const Banner = () => {


    return (
        <div className="banner pt-5 row">
            <div className="font-weight-bold col-md-12 d-flex justify-content-center">
                <BannerText></BannerText>
            </div>
            <div className="col-md-12 d-flex justify-content-center">
                <img src={image} alt=""/>
            </div>
        </div>
    );
};
export default Banner;