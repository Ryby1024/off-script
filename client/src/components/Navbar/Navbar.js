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
                    </ul>
            </nav>
        )
    }
}
export default Navbar;