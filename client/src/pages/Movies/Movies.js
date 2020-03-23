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
    }

    render(){
        return(
            <Container>
                <h1>Movies</h1>
            </Container>
        )
    }

}
export default withRouter(Movie);