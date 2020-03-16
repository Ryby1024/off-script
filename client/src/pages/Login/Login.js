import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import API from "../../utils/API";
import "./style.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  login = event => {
    event.preventDefault();
    API.login({
      username: this.state.username.toLowerCase(),
      password: this.state.password
    })
      .then(res => {
        if (res.data.message) {
          this.setState({
            error: res.data.message
          });
        } else {
          console.log("login successful")
          this.props.isAuthorized();
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: "A server error has occured." });
      });

    this.setState({ password: "" });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.trim()
    });
  };

  render() {
    return (
      <Container>

      </Container>
    );
  }
}

export default Login;