import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid/Grid"
import API from "../../utils/API";
import { withRouter } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";
import "./Search.css";


class Search extends Component {
    constructor(props) {
        super(props);


        this.state = {
            result: [],
            title:  "",
            search: "",
            rating: "",
            comment: "",
            showRatingForm: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.APIKEY = process.env.REACT_API_KEY;
        this.rateMovie = this.rateMovie.bind(this);
    }

    componentDidMount() {
        this.searchMovies("Avengers")
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });


    };

    showForm = () => {
        return (
            <Container>
            <Row>
                <Col size="s12">
            <div id="movie-rate"> 
           <form id= "rate-movie" onClick={this.newRating}>
       
                <label>Movie Name : </label>
                <input type="text"name="title" value={this.state.result.Title} onChange={this.handleInputChange} placeholder={this.state.result.Title}/>
       
                <label>Rating:   </label>
                <input onChange={this.handleInputChange} name="rating" value={this.state.rating} type="text" placeholder="Between 1-10" />
       
                <label>Comment: </label>
                <input name="comment" value={this.state.comment} onChange={this.handleInputChange} type="text" placeholder="Enter comments here"/>
       
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
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
        this.setState({showRatingForm: true})
    }
    newRating = () => {

    }

    render() {
        const { showRatingForm } = this.state
        return (
            <Container>
                <div className="row" id="movie-card">
                    <div className="col s6">
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


export default Search;