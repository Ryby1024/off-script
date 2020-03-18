import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid/Grid"
import API from "../../utils/API";
import {withRouter} from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";


class Search extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
            result: [],
            search: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
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
        .then(res =>{
            let newMovie = res.data;
            console.log(newMovie)
            this.setState({
                result: newMovie
            })
            console.log(this.state.result.Title)
        }).catch(err => console.log(err));
        
    }
    
    
    render(){
        return(
            <Container>
                <Row>
                    <Col size="s12">
                        <MovieCard
                        Poster={this.state.result.Poster}
                        Title={this.state.result.Title}
                        Plot={this.state.result.Plot}
                        Released={this.state.result.Released} />
                    </Col>
                </Row>
            </Container>
        )
    }

    }


export default Search;