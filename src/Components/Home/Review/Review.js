import React, { useEffect, useState } from 'react';
import ReviewData from '../ReviewData/ReviewData';
import "./Review.css";



const Review = () => {

    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        fetch('https://pure-island-17993.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => {
                setReviewData(data);
            })
    }, [setReviewData])

    const showDiv = () =>{
        const review = document.getElementById("review-height");
        review.style.height="100%";
        document.getElementById("see-more-style").style.display="none";
        document.getElementById("hide-more-style").style.display="block";
    }
    const hideDiv = () =>{
        const review = document.getElementById("review-height");
        review.style.height="300px";
        review.style.cursor="pointer";
        document.getElementById("see-more-style").style.display="block";
        document.getElementById("hide-more-style").style.display="none";
    }

    return (
        <div className="banner-bg mt-3">
            <h4 className="text-center pt-5 text-white">Clients Testimonial</h4>
            <div className="row d-flex justify-content-center" id="review-height">

                {
                    reviewData.map(data => <ReviewData data={data} key={data._id}></ReviewData>)
                }
            </div>
            <p id="see-more-style" onClick={showDiv}>See More</p>
            <p id="hide-more-style" onClick={hideDiv}>Hide More</p>
        </div>
    );
};

export default Review;