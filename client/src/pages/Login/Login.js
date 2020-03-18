import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid/Grid";
import API from "../../utils/API";

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
        <Row>
          <Col size="s12">
            <div className="loginContainer">
              <form id="login-form">
                <Row>
                  <Col size="s12">
                    <label htmlFor="username">Username</label>
                    <input
                      placeholder="Username"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      id="username"
                      type="text"
                      className="validate"></input>
                  </Col>
                </Row>

                <Row>
                  <Col size="s12">
                    <label htmlFor="password">Password</label>
                    <input
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      id="password"
                      type="text"
                      className="validate"></input>
                  </Col>
                </Row>
                <button 
                
                onClick={this.login}
                className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
                </button>
                <Link to="/register">Not registered? Click here.</Link>
              </form>
            </div>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default Login;