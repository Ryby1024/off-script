import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid/Grid"
import API from "../../utils/API";
import { withRouter } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";
import "./Search.css";


const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};


class Search extends Component {
    constructor(props) {
        super(props);


        this.state = {
            result: [],
            title: "",
            search: "",
            rating: null,
            comment: "",
            showRatingForm: false,
            formErrors: {
                title: "",
                rating: ""
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.APIKEY = process.env.REACT_API_KEY;
        this.rateMovie = this.rateMovie.bind(this);
    }

    componentDidMount() {
        this.searchMovies("Avengers")
    }
    handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "title":
                formErrors.title =
                    value.length < 1 ? "Movie Title cannot be empty." : "";
                break;

            case "rating":
                formErrors.rating =
                   isNaN(value) ? "Rating must be a number." : "";
                break;

            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    showForm = () => {
        const { formErrors } = this.state;
        return (
            <Container>
                <Row>
                    <Col size="s12">
                        <div id="movie-rate">
                            <form id="rate-movie">

                                <label>Movie Name : </label>
                                <input onChange={this.handleInputChange}  className={formErrors.title.length > 0 ? "error" : null} name="title" noValidate value={this.state.title} type="text"  placeholder={this.state.result.Title} />
                                {formErrors.title.length > 0 && (
                                    <span className="errorMessage">{formErrors.title}</span>
                                )}
                                <label>Rating:   </label>
                                <input onChange={this.handleInputChange} className={formErrors.rating.length > 0 ? "error" : null} name="rating" noValidate value={this.state.rating} type="text" placeholder="Between 1-10" />
                                {formErrors.rating.length > 0 && (
                                    <span className="errorMessage">{formErrors.rating}</span>
                                )}
                                <label>Comment: </label>
                                <input name="comment" value={this.state.comment} onChange={this.handleInputChange} type="text" placeholder="Enter comments here" />

                                <button onClick={this.newRating} className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                            </form>

                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }



    searchMovies = query => {

        API.search(query)

            .then(res => {
                let newMovie = res.data;
                console.log(newMovie)
                this.setState({
                    result: newMovie
                })
                console.log(this.state.result.Title)
            }).catch(err => console.log(err));

    }
    handleMovieSearch = (event) => {
        event.preventDefault();
        axios.get(`https://www.omdbapi.com/?t=${this.state.search}&apikey=279e7e43`)
            .then(res => {
                let movie = res.data;
                console.log(movie)
                this.setState({
                    result: movie
                })
            }).catch(err => console.log(err))

    }
    rateMovie = () => {
        this.setState({ showRatingForm: true })
    }
    newRating = (event) => {
        event.preventDefault();
        if (formValid(this.state)) {
            API.newRating({
                title: this.state.title,
                rating: this.state.rating,
                comment: this.state.comment
            }).then(res => {
                console.log(res)
                this.props.history.push("/")
            }).catch(err => {
                console.log(err)
            })
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        };

    };

    render() {
      
        const { showRatingForm } = this.state
        return (
            <Container>
                <div className="row" >
                    <div className="col s6" id="movie-card">
                        <MovieCard
                            Poster={this.state.result.Poster}
                            Title={this.state.result.Title}
                            Plot={this.state.result.Plot}
                            Released={this.state.result.Released}
                            rateMovie={this.rateMovie} />
                    </div>
                    <div className="col s6" id="search-form">
                        <form action="" onSubmit={this.handleMovieSearch}>
                            <label htmlFor="search">Search Movies</label>
                            <input placeholder="Movie Title"
                                name="search"
                                value={this.state.search}
                                onChange={this.handleInputChange}
                                id="search"
                                type="text"></input>
                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        </button>
                        </form>
                    </div>
                </div>
                {showRatingForm && this.showForm()}
            </Container>
        )
    }

}


export default withRouter(Search);