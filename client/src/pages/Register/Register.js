import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid/Grid";
import { Small } from "../../components/Form/Form";
import API from "../../utils/API";

class Register extends Component {
  state = {
    firstname: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
    validUN: false,
    validEM: false,
    validPW: false,
    validCF: false,
    error: "",
    // eslint-disable-next-line
    reg: new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  };

  validateField = (name, value) => {
    switch (name) {
      case "firstname":
        break;

      case "username":
        if (value.length > 5) {
          API.availableUN(value.toLowerCase())
            .then(res => {
              res.data.length < 1
                ? this.setState({ validUN: true })
                : this.setState({ validUN: false });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.setState({ validUN: false });
        }
        break;
      case "email":
        this.setState({ validEM: this.state.reg.test(value) });
        break;
      case "password":
        this.setState({
          validPW: value.length > 7,
          validCF: value.length > 7 && value === this.state.confirm
        });
        break;
      case "confirm":
        this.setState({
          validCF: this.state.validPW && this.state.password === value
        });
        break;
      default:
    }
  };

  register = event => {
    event.preventDefault();
    API.register({
      firstname: this.state.firstname,
      username: this.state.username.toLowerCase(),
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        if (res.data.message) {
          this.setState({
            error: res.data.message
          });
        } else {
          console.log("registration successful");
          this.props.isAuthorized();
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: "A server error has occured." });
      });

    this.setState({
      password: "",
      confirm: ""
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.validateField(name, value);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="s12">
            <div className="registerContainer">
              <form id="register-form">
                <Row>
                  <Col size="s12">
                    <div className="input-field">
                      <input
                        placeholder="First Name"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleInputChange}
                        type="text"
                      ></input>
                      <label htmlFor="firstname">First Name</label>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col size="s12">
                    <div className="input-field">
                      <input
                        placeholder="at least 6 characters"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        id="username"
                        type="text"
                      ></input>
                      <label htmlFor="username">Username</label>
                      {this.state.validUN ? <Small text="Username is available" /> : <Small text="Username is not available" />}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col size="s12">
                    <div className="input-field">

                      <input
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        id="email"
                        type="email"
                      ></input>
                      <label htmlFor="email">Email</label>
                      {this.state.validEM ? <Small text="Email is valid" /> : <Small text="Email is invalid" />}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col size="s12">
                    <div className="input-field">

                      <input
                        placeholder="at least 8 characters"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        id="password"
                        type="password"
                      ></input>
                      <label htmlFor="password">Password</label>
                      {this.state.validPW ? <Small text="Password is valid" /> : <Small text="Password must be at least 8 characters" />}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col size="s12">
                    <div className="input-field">

                      <input
                        placeholder="Confirm Password"
                        name="confirm"
                        value={this.state.confirm}
                        onChange={this.handleInputChange}
                        id="confirm-password"
                        type="password"
                      ></input>
                      <label htmlFor="confirm-password">Confirm Password</label>
                      {this.state.validCF ? <Small text="Passwords match" /> : <Small text="Passwords don't match" />}
                    </div>
                  </Col>
                </Row>
                {this.state.error ? <Small text={this.state.error} /> : ""}

                <button 
                disabled={
                  this.state.validUN && this.state.validEM && this.state.validCF
                    ? ""
                    : "disabled"
                }
                onClick={this.register}
                className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Register;