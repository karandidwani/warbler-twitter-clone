import React, {Component} from "react";
import {Link} from "react-router-dom";
import Logo from "../images/warbler-logo.png"

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src={Logo} alt="Warbler Home"/>
                    </Link>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                        <li>
                            <Link to="/signin">Log in</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;