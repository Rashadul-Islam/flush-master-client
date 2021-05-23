import React, { useEffect, useState } from 'react';
import "./Review.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Review = () => {

    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        fetch('https://pure-island-17993.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => {
                setReviewData(data);
            })
    }, [setReviewData])

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="banner-bg pt-4 pb-5 text-center">
            <h3 className="text-white pb-3 font-weight-bold">Clients Testimonial</h3>
            <Slider {...settings}>
                {reviewData.map(function (data) {
                    console.log(data);
                    return (
                        <div className="d-flex justify-content-center col">
                            <div className="card review-card pb-3" style={{ width: "18rem" }}>
                                <img className="card-img-top" src={data.imageURL} alt="" />
                                <div className="card-body">
                                    <p>{data.reviewerName}</p>
                                    <p>{data.designation}</p>
                                    <p>{data.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default Review;