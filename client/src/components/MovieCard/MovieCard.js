import React from "react";
import "./MovieCard.css"


const MovieCard = (props) => {
    return(
        <div className="card">
            <div className="card-image">
                <img id="poster"src={props.Poster}/>
                </div>
                <div className="card-content">
                    <h4> {props.Title}</h4>
                <p>{props.Plot}</p>
                <p>{props.Released}</p>
                <p>{props.Rating}</p>
                <p>{props.comment}</p>
                </div>
                <button className="btn waves-effect waves-light" id="ratemovie" onClick={() => props.rateMovie(props.Title)} >Rate Movie</button>
        </div>
    )
}
export default MovieCard;