import React from 'react';
import "./ReviewData.css";

const ReviewData = (props) => {
    const { reviewerName, designation, description } = props.data;
    return (
        <div className="d-flex justify-content-center col-lg-4 col-md-6  pb-5 pt-5 text-center">
            <div className="card review-card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <p>{reviewerName}</p>
                    <p>{designation}</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewData;