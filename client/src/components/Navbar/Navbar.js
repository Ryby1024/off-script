import React, {Component} from "react";
import { Link } from "react-router-dom";


class Navbar extends Component{
    render(){
        return(
            <nav>
                <Link className="navbar-brand" to="/">
                    Home
                </Link>                
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <Link to="/login" className={window.location.pathname === "/login"  ? "nav-link active" : "nav-link"}>
                                Sign In
                            </Link>
                        </li>

                        <li>
                            <Link to="/register" className={window.location.pathname === "/register"  ? "nav-link active" : "nav-link"}>
                                Register
                            </Link>
                        </li>

                        <li>
                            <Link to="/search" className={window.location.pathname === "/search"  ? "nav-link active" : "nav-link"}>
                                Search Movies
                            </Link>
                        </li>

                        <li>
                            <Link to="/movie" className={window.location.pathname === "/movie"  ? "nav-link active" : "nav-link"}>
                                Movies
                            </Link>
                        </li>
                    </ul>
            </nav>
        )
    }
}
export default Navbar;