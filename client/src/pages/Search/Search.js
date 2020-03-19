import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid/Grid"
import API from "../../utils/API";
import { withRouter } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";


class Search extends Component {
    constructor(props) {
        super(props);


        this.state = {
            result: [],
            search: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.APIKEY = process.env.REACT_API_KEY
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
    handleMovieSubmit = (event) => {
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


    render() {
        return (
            <Container>
                <Row>
                    <Col size="s8">
                        <MovieCard
                            Poster={this.state.result.Poster}
                            Title={this.state.result.Title}
                            Plot={this.state.result.Plot}
                            Released={this.state.result.Released} />
                    </Col>
                    <Col size="s4">
                        <form action="" onSubmit={this.handleMovieSubmit}>
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
                    </Col>
                </Row>
            </Container>
        )
    }

}


export default Search;