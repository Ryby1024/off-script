import React from "react";
import "./RatedMovieCard.css";
const RatedMovieCard = (props) => {
    return(
        <div className="rated-card">
            <div className="card-content">
                <div className="card-header">
                <h4> {props.title}</h4>
                </div>
                <div className="card-body">
                <p>Rating:  {props.rating}</p>
                <p>Comment: {props.comment}</p>
                </div>
            </div>
        </div>
    )
} 
export default RatedMovieCard;