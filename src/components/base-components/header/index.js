import React, { Component } from "react";
import "./index.scss";
import { Link } from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <header className="bg-dark p-3 d-flex justify-content-between align-items-center">
                {!this.props.isLoggedIn ? (
                    <>
                    <Link to="/" className="text-light">
                        <i className="fa fa-home" />
                    </Link>
                    <Link to="/login" className="text-light">
                        Login
                    </Link>
                    </>
                ) : (
                    <>
                    <Link to="/home" className="text-light">
                        <i className="fa fa-home" />
                    </Link>
                        <span 
                            onClick={() => this.props.logoutUser()}
                            className="btn btn-outline-danger ml-3" >
                            Logout
                        </span>
                    </>
                )}
            </header>
        );
    }
}
