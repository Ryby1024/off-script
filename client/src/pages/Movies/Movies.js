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
            movie: [],
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
        this.setState({ [name]: value }, () => console.log(this.state));
    }

    getMovies = () => {
        API.getMovies()
        .then(res => {
            let allMovies = res.data.movie;
            console.log(allMovies)
            this.setState({
                movie: allMovies
            })
        })
    }

    

    render(){
        return(
            <Container>
                <h1>Movies</h1>
                <Row>
                    <Col size="sm-12">
                        <MovieCard 
                        key={this.state.movie._id}
                        _id={this.state.movie._id}
                        Title={this.state.movie.title}
                        Plot={this.state.movie.Plot}
                        rating={this.state.rating}

                        />
                    </Col>
                </Row>
            </Container>
        )
    }

}
export default withRouter(Movie);