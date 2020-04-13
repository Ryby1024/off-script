import React, { Component} from "react";
import {Container, Row, Col} from "../../components/Grid/Grid";
import API from "../../utils/API";
import { withRouter } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";

class Movie extends Component {
    constructor(props){
        super(props);

        this.state = {
            movies: [],
            id: "",
            title: "",
            rating: null,
            comment: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount(){
        this.getMovies();
    }
    handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ 
            [name]: value
         });
    }

    getMovies = () => {
        API.getMovies()
        .then(res => {
            let allMovies = res.data;
            console.log(allMovies)
            this.setState({
                movies: allMovies
            })
        })
        
    }

    get ratedMovies(){
        const { movies } = this.state
        console.log(movies);
        if(Array.isArray(movies)) {
            return movies.map( movie => {
                if(movie.rating) {
                    console.log(movie.title)
                return <MovieCard 
                key={movie._id}
                id={movie._id}
                Title={movie.title}
                Rating={movie.rating}
                comment={movie.comment}
                />
                }
            })
        }
    }

    

    render(){
        return(
            <Container>
                <h1>Movies</h1>
                <Row>
                    <Col size="sm-12">
                       {this.ratedMovies}
                    </Col>
                </Row>
            </Container>
        )
    }

}
export default withRouter(Movie);