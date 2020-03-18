import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import API from "./utils/API";
import "./App.css";

class App extends Component {

  state = {
    authorized: false,
  }

  componentDidMount() {
    this.isAuthorized();
  }


  isAuthorized = () => {
    API.isAuthorized()
      .then(res => {
        if (res.data.message) {
          this.setState({ authorized: false });
        } else {
          this.setState({ authorized: true });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ authorized: false });
      });
  };

  logout = () => {
    API.logout()
      .then(res => {
        console.log("logged out");
        this.isAuthorized();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Router>
        <Navbar logout={this.logout} />
          <Route exact path="/">
            {this.state.authorized ? (
              <Home />) : (
                <Redirect to="/login" />
              )}
          </Route>

          <Route exact path="/login">
            {this.state.authorized ? (
              <Redirect to="/" />) : (
                <Login isAuthorized={this.isAuthorized} />
              )}
              </Route>
            <Route exact path="/register">
              {this.state.authorized ? (
                <Redirect to="/" />) : (
                  <Register isAuthorized={this.isAuthorized} />
                )}
            </Route>
          
        
      </Router>

    );
  }
}

export default App;
